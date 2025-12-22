import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3004';
const OUTPUT_DIR = 'scripts/audit/results';

// Public pages to audit (skip admin pages)
const PAGES_TO_AUDIT = [
  { path: '/', name: 'homepage' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/courses', name: 'courses' },
  { path: '/book-session', name: 'book-session' },
  { path: '/contact', name: 'contact' },
  { path: '/brand', name: 'brand' },
];

interface LinkResult {
  url: string;
  status: number | 'error';
  page: string;
  text: string;
}

interface PageAudit {
  path: string;
  name: string;
  screenshot: string;
  links: LinkResult[];
  brokenLinks: LinkResult[];
  loadTime: number;
  errors: string[];
}

interface AuditReport {
  baseUrl: string;
  timestamp: string;
  pages: PageAudit[];
  summary: {
    totalPages: number;
    totalLinks: number;
    brokenLinks: number;
    pagesWithErrors: number;
  };
}

async function checkLink(page: Page, url: string, linkText: string, sourcePage: string): Promise<LinkResult> {
  try {
    // Skip mailto, tel, and anchor links
    if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
      return { url, status: 200, page: sourcePage, text: linkText };
    }

    const response = await page.request.head(url, { timeout: 10000 });
    return { url, status: response.status(), page: sourcePage, text: linkText };
  } catch (error) {
    return { url, status: 'error', page: sourcePage, text: linkText };
  }
}

async function auditPage(browser: Browser, pageInfo: typeof PAGES_TO_AUDIT[0]): Promise<PageAudit> {
  const page = await browser.newPage();
  const errors: string[] = [];

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  const fullUrl = `${BASE_URL}${pageInfo.path}`;
  console.log(`\n📄 Auditing: ${fullUrl}`);

  const startTime = Date.now();

  try {
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    // Wait a bit for any lazy-loaded content
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error(`  ❌ Failed to load page: ${e}`);
    errors.push(`Page load failed: ${e}`);
  }

  const loadTime = Date.now() - startTime;
  console.log(`  ⏱️  Load time: ${loadTime}ms`);

  // Take full-page screenshot
  const screenshotPath = path.join(OUTPUT_DIR, 'screenshots', `${pageInfo.name}.png`);
  try {
    await page.screenshot({ path: screenshotPath, fullPage: true, timeout: 60000 });
    console.log(`  📸 Screenshot saved: ${screenshotPath}`);
  } catch (e) {
    console.error(`  ❌ Screenshot failed: ${e}`);
    errors.push(`Screenshot failed: ${e}`);
  }

  // Find all links on the page
  const linkElements = await page.$$('a[href]');
  const links: LinkResult[] = [];
  const checkedUrls = new Set<string>();

  console.log(`  🔗 Checking ${linkElements.length} links...`);

  for (const linkEl of linkElements) {
    const href = await linkEl.getAttribute('href');
    const text = (await linkEl.textContent())?.trim() || '';

    if (!href) continue;

    // Normalize URL
    let fullHref = href;
    if (href.startsWith('/')) {
      fullHref = `${BASE_URL}${href}`;
    } else if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
      fullHref = `${BASE_URL}/${href}`;
    }

    // Skip already checked URLs
    if (checkedUrls.has(fullHref)) continue;
    checkedUrls.add(fullHref);

    const result = await checkLink(page, fullHref, text, pageInfo.path);
    links.push(result);
  }

  const brokenLinks = links.filter(l => l.status === 'error' || (typeof l.status === 'number' && l.status >= 400));

  if (brokenLinks.length > 0) {
    console.log(`  ⚠️  Found ${brokenLinks.length} broken links`);
    brokenLinks.forEach(l => console.log(`     - ${l.url} (${l.status})`));
  } else {
    console.log(`  ✅ All links valid`);
  }

  await page.close();

  return {
    path: pageInfo.path,
    name: pageInfo.name,
    screenshot: screenshotPath,
    links,
    brokenLinks,
    loadTime,
    errors,
  };
}

async function runAudit() {
  console.log('🔍 OrlaMarieCoach Site Audit');
  console.log('============================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  // Ensure output directories exist
  fs.mkdirSync(path.join(OUTPUT_DIR, 'screenshots'), { recursive: true });

  const browser = await chromium.launch();
  const pages: PageAudit[] = [];

  for (const pageInfo of PAGES_TO_AUDIT) {
    const result = await auditPage(browser, pageInfo);
    pages.push(result);
  }

  await browser.close();

  // Generate report
  const report: AuditReport = {
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    pages,
    summary: {
      totalPages: pages.length,
      totalLinks: pages.reduce((sum, p) => sum + p.links.length, 0),
      brokenLinks: pages.reduce((sum, p) => sum + p.brokenLinks.length, 0),
      pagesWithErrors: pages.filter(p => p.errors.length > 0).length,
    },
  };

  // Save JSON report
  const reportPath = path.join(OUTPUT_DIR, 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Report saved: ${reportPath}`);

  // Print summary
  console.log('\n============================');
  console.log('📋 AUDIT SUMMARY');
  console.log('============================');
  console.log(`Pages audited: ${report.summary.totalPages}`);
  console.log(`Total links checked: ${report.summary.totalLinks}`);
  console.log(`Broken links: ${report.summary.brokenLinks}`);
  console.log(`Pages with console errors: ${report.summary.pagesWithErrors}`);

  if (report.summary.brokenLinks > 0) {
    console.log('\n❌ BROKEN LINKS:');
    pages.forEach(p => {
      if (p.brokenLinks.length > 0) {
        console.log(`\n  ${p.path}:`);
        p.brokenLinks.forEach(l => {
          console.log(`    - ${l.url} (${l.status}) "${l.text}"`);
        });
      }
    });
  }

  if (report.summary.pagesWithErrors > 0) {
    console.log('\n⚠️  CONSOLE ERRORS:');
    pages.forEach(p => {
      if (p.errors.length > 0) {
        console.log(`\n  ${p.path}:`);
        p.errors.forEach(e => console.log(`    - ${e}`));
      }
    });
  }

  console.log('\n✅ Audit complete!');
  console.log(`Screenshots saved to: ${OUTPUT_DIR}/screenshots/`);
}

runAudit().catch(console.error);

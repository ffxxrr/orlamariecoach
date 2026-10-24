// Check blog posts for the obvious signs of AI-written text before Orla sees them.
// Node port of the ai-tells-lint Python script, so it runs on Windows with nothing to install.
//
// Usage:
//   npm run lint:blog                         # every post in content/blog
//   node scripts/lint-blog.js <post.md> ...   # specific files
//   options: --strict (warnings fail too), --json, --spelling uk|us|off (default uk)
//
// Two tiers:
//   MUST FIX   chat residue that must never be published ("Certainly! Here's...", [Insert X], TODO). Exit 1.
//   Should fix style tells (em dashes, "delve", "In today's fast-paced world"). Exit 0 unless --strict.
//
// To tune: edit the lists below. If a word keeps getting flagged where it's the right word, remove it.

const fs = require('fs');
const path = require('path');

const BLOCK_RULES = [
  // The model talking to the person who prompted it
  [/\bas an ai\b|\bas a (large )?language model\b|\bi'?m an ai\b/gim, 'AI self-reference'],
  [/^\s*(certainly|sure|absolutely|of course)[!,.]?\s+(here'?s|here is|below is)\b/gim,
    'chat preamble left at the top of the post'],
  [/\bhere(?:'s| is) (?:the|a|your) (?:revised |updated |draft )?(?:blog post|article|post|draft|rewrite)\b/gim,
    "chat preamble ('here is the blog post')"],
  [/\bi hope this (helps|meets your needs)\b|\blet me know if you(?:'d| would) like\b|\bfeel free to (adjust|modify|tweak)\b|\bwould you like me to\b/gim,
    'chat sign-off left at the end of the post'],
  [/\bas of my (last )?(knowledge|training) (cutoff|update)\b|\bmy training data\b/gim,
    'AI self-reference (training cutoff)'],

  // Template residue. Not followed by "(" so real markdown links like [your free call](/contact) pass.
  [/(?<!!)\[(?:insert|add|your|placeholder|link|image|citation needed|source)[^\]]*\](?!\()/gim,
    'unfilled placeholder in square brackets'],
  [/\{\{[^}]*\}\}/gim, 'unfilled {{placeholder}}'],
  [/\bTODO\b|\bTBD\b|\bFIXME\b|\blorem ipsum\b/gim, 'unfinished marker left in'],
];

const WARN_RULES = [
  // Dashes
  [/—/g, 'em dash; use a comma, colon, semicolon, brackets or a new sentence'],
  [/\s–\s/g, 'spaced en dash used as a dash (same rule as the em dash)'],
  [/\s--\s/g, 'double hyphen used as a dash'],
  // Number ranges like "ages 5 - 10" are fine
  [/(?<=[A-Za-z.,)\]'"]) - (?=[A-Za-z0-9(["'])|(?<=[0-9]) - (?=[A-Za-z(["'])/g,
    'spaced hyphen used as a sentence break; use a colon, comma or full stop'],

  // Openers
  [/\bin today'?s (fast[- ]paced|digital|modern|ever[- ]changing|competitive)?\s*(world|age|era|landscape|society|market)\b/gim,
    'stock AI opener'],
  [/\bin the (ever[- ]evolving|ever[- ]changing|fast[- ]paced|dynamic) (world|landscape|realm) of\b/gim,
    'stock AI opener'],
  [/\b(let'?s|we'?ll|we will) (dive|delve|jump) (in|into|right in)\b|\bwithout further ado\b|\bbuckle up\b/gim,
    'stock AI transition'],
  [/\bin this (article|post|blog post|blog|guide),? (we|i)(?:'ll| will| are going to)\b/gim,
    'announces what the post will do instead of doing it'],
  [/\bhave you ever wondered\b|\bpicture this\b|\bimagine a world\b/gim, 'stock AI hook'],

  // Structural tells
  [/\bwhether you'?re (an? )?\w+(?: \w+)? or (an? )?\w+/gim, "'Whether you're X or Y' framing"],
  [/\bit'?s not (just|only|merely) (about )?[^.,;\n]{1,60}[,;]? (it'?s|but)\b|\bnot (just|only|merely) [^.,;\n]{1,40}, but (also )?\b/gim,
    "'Not just X, but Y' construction"],
  [/\bhere'?s the (thing|kicker|catch)\b|\bthe best part\?|\bthe result\?/gim, 'conversational AI pivot'],
  [/(?:^|[.!?]\s+)(?:so,? )?what does this mean for you\?/gim, 'rhetorical question the post answers itself'],
  [/^#{1,6}\s*(conclusion|in conclusion|final thoughts|key takeaways|wrapping up)\s*$/gim, 'stock closing heading'],
  [/^#{1,6}\s*(?:\p{Extended_Pictographic})/gimu, 'emoji at the start of a heading'],

  // Banned phrases
  [/\bit'?s worth noting( that)?\b|\bit is (worth|important) (noting|to note)( that)?\b|\bit'?s important to (note|remember)( that)?\b/gim,
    'filler; drop it and state the point'],
  [/\bmoving forward\b|\bfirst and foremost\b|\blast but not least\b|\ball in all\b|\bin conclusion\b|\bin summary\b|\bto sum up\b|\bshed light on\b|\bpave the way\b|\bat the forefront\b|\bdeep[- ]dive\b|\ba testament to\b|\bplays? a (crucial|vital|pivotal|key) role\b|\bnavigat(e|ing) the (complexities|challenges|world|landscape)\b|\bunlock(ing)? (the|your) (full )?(potential|power|secrets?)\b|\bstands? as a\b|\bserves? as a (powerful |stark )?reminder\b|\bwhen it comes to\b|\bat the end of the day\b|\bgame[- ]chang(er|ing)\b/gim,
    'stock AI phrase'],
  [/\bi hope this (email|message|post) finds you well\b|\bgreat question\b/gim, 'filler'],
];

// Words that are almost never the plain choice. 'holistic' and 'resonate' are left out:
// they're fair words in mindfulness writing. 'journey' (Turas) is never flagged.
const BANNED_WORDS = [
  'tapestry', 'vibrant', 'bustling', 'beacon', 'realm', 'foster', 'fostering',
  'delve', 'delves', 'delving', 'elevate', 'elevates', 'elevating', 'leverage',
  'leveraging', 'harness', 'harnessing', 'streamline', 'streamlining',
  'spearhead', 'spearheading', 'unleash', 'unleashing', 'pivotal',
  'groundbreaking', 'cutting-edge', 'transformative', 'revolutionise',
  'revolutionize', 'paradigm', 'synergy', 'synergies', 'seamless',
  'seamlessly', 'bespoke', 'multifaceted', 'myriad', 'plethora',
  'underscores', 'underscoring', 'embark', 'embarking', 'intricate',
  'intricacies', 'meticulous', 'meticulously', 'testament', 'ever-evolving',
  'showcasing', 'boasts', 'invaluable', 'commendable', 'noteworthy',
];

// British/US pairs: [uk, us]. 'metre/meter' is left out because a gas meter is correct in both.
const SPELLING_PAIRS = [
  ['organise', 'organize'], ['organised', 'organized'], ['organising', 'organizing'],
  ['organisation', 'organization'], ['organisations', 'organizations'],
  ['recognise', 'recognize'], ['recognised', 'recognized'],
  ['realise', 'realize'], ['realised', 'realized'], ['realising', 'realizing'],
  ['customise', 'customize'], ['customised', 'customized'],
  ['optimise', 'optimize'], ['optimised', 'optimized'], ['optimisation', 'optimization'],
  ['prioritise', 'prioritize'], ['prioritised', 'prioritized'],
  ['summarise', 'summarize'], ['summarised', 'summarized'],
  ['minimise', 'minimize'], ['maximise', 'maximize'],
  ['personalise', 'personalize'], ['personalised', 'personalized'],
  ['analyse', 'analyze'], ['analysed', 'analyzed'], ['analysing', 'analyzing'],
  ['apologise', 'apologize'], ['apologised', 'apologized'],
  ['specialise', 'specialize'], ['specialised', 'specialized'],
  ['emphasise', 'emphasize'], ['emphasised', 'emphasized'],
  ['utilise', 'utilize'], ['utilised', 'utilized'],
  ['colour', 'color'], ['colours', 'colors'], ['colourful', 'colorful'],
  ['behaviour', 'behavior'], ['behaviours', 'behaviors'],
  ['favour', 'favor'], ['favourite', 'favorite'], ['favourites', 'favorites'],
  ['honour', 'honor'], ['neighbour', 'neighbor'], ['neighbours', 'neighbors'],
  ['flavour', 'flavor'], ['flavours', 'flavors'], ['humour', 'humor'],
  ['centre', 'center'], ['centres', 'centers'], ['centred', 'centered'],
  ['cancelled', 'canceled'], ['cancelling', 'canceling'],
  ['travelled', 'traveled'], ['travelling', 'traveling'],
  ['labelled', 'labeled'], ['labelling', 'labeling'],
  ['grey', 'gray'], ['catalogue', 'catalog'], ['defence', 'defense'],
  ['enrolment', 'enrollment'], ['fulfil', 'fulfill'], ['fulfilment', 'fulfillment'],
  ['favourable', 'favorable'], ['endeavour', 'endeavor'], ['jewellery', 'jewelry'],
  ['mum', 'mom'], ['theatre', 'theater'], ['litre', 'liter'],
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Blank out code and URLs, keeping line numbers intact
function maskCodeAndUrls(text) {
  const blank = (m) => m.replace(/[^\n]/g, ' ');
  return text
    .replace(/^```[\s\S]*?^```/gm, blank)
    .replace(/`[^`\n]+`/g, blank)
    .replace(/https?:\/\/\S+/g, blank);
}

function lint(raw, spelling = 'uk') {
  const originalLines = raw.split('\n');
  const text = maskCodeAndUrls(raw);
  const findings = [];
  const lineOf = (pos) => text.slice(0, pos).split('\n').length;
  const snippet = (ln) => {
    const s = (originalLines[ln - 1] || '').trim();
    return s.length <= 110 ? s : s.slice(0, 107) + '...';
  };
  const add = (level, m, why) => {
    const line = lineOf(m.index);
    findings.push({ level, line, match: m[0].trim().slice(0, 40), why, snippet: snippet(line) });
  };

  for (const [re, why] of BLOCK_RULES) for (const m of text.matchAll(re)) add('block', m, why);
  for (const [re, why] of WARN_RULES) for (const m of text.matchAll(re)) add('warn', m, why);

  for (const w of BANNED_WORDS) {
    for (const m of text.matchAll(new RegExp(`(?<![\\w-])${escapeRe(w)}(?![\\w-])`, 'gi'))) {
      add('warn', m, 'AI-flavoured vocabulary');
    }
  }

  if (spelling === 'uk' || spelling === 'us') {
    for (const [uk, us] of SPELLING_PAIRS) {
      const [wrong, right] = spelling === 'uk' ? [us, uk] : [uk, us];
      for (const m of text.matchAll(new RegExp(`\\b${escapeRe(wrong)}\\b`, 'gi'))) {
        add('warn', m, `${spelling === 'uk' ? 'US' : 'UK'} spelling; use '${right}'`);
      }
    }
  }

  // Consecutive paragraphs opening with "This". A heading in between resets it.
  let prevThis = false;
  let pos = 0;
  for (const para of text.split(/\n\s*\n/)) {
    const start = text.indexOf(para, pos);
    pos = start + para.length;
    const first = para.trim();
    if (!first || /^[#>|-]/.test(first)) {
      if (first.startsWith('#')) prevThis = false;
      continue;
    }
    const isThis = /^This\b/.test(first);
    if (isThis && prevThis) {
      const line = lineOf(start + para.indexOf(first));
      findings.push({ level: 'warn', line, match: 'This', why: "second paragraph in a row opening with 'This'", snippet: snippet(line) });
    }
    prevThis = isThis;
  }

  const dashes = (text.match(/—/g) || []).length;
  if (dashes >= 3) {
    findings.push({ level: 'warn', line: 0, match: `${dashes} em dashes`, why: 'em dash count is a strong AI tell', snippet: '' });
  }

  // The same 10-word sentence start twice usually means a point was made twice
  const body = text.replace(/\|[^\n]*\n/g, '');
  const seen = new Set();
  for (const s of body.split(/(?<=[.!?])\s+/).map((x) => x.trim())) {
    const words = s.split(/\s+/).filter(Boolean);
    if (words.length < 10) continue;
    const key = words.slice(0, 10).join(' ').toLowerCase();
    if (seen.has(key)) {
      findings.push({ level: 'warn', line: 0, match: key.slice(0, 48), why: 'near-duplicate sentence opening', snippet: s.slice(0, 110) });
    }
    seen.add(key);
  }

  const order = { block: 0, warn: 1 };
  return findings.sort((a, b) => order[a.level] - order[b.level] || a.line - b.line || a.match.localeCompare(b.match));
}

function format(findings) {
  if (!findings.length) return 'Clean: no AI tells found.';
  const fmt = (f) =>
    `  ${(f.line ? `L${f.line}` : '--').padStart(5)}  ${f.why}\n         match: '${f.match}'` +
    (f.snippet ? `\n         ${f.snippet}` : '');
  const out = [];
  const blocks = findings.filter((f) => f.level === 'block');
  const warns = findings.filter((f) => f.level === 'warn');
  if (blocks.length) out.push(`MUST FIX (${blocks.length}):`, ...blocks.map(fmt));
  if (warns.length) out.push(`Should fix (${warns.length}):`, ...warns.map(fmt));
  return out.join('\n');
}

function main(argv) {
  const opts = { strict: false, json: false, spelling: 'uk' };
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--strict') opts.strict = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--spelling') opts.spelling = argv[++i];
    else if (a.startsWith('--spelling=')) opts.spelling = a.split('=')[1];
    else files.push(a);
  }
  if (!['uk', 'us', 'off'].includes(opts.spelling)) {
    console.error('--spelling must be uk, us or off');
    return 2;
  }
  if (!files.length) {
    const dir = path.join(__dirname, '..', 'content', 'blog');
    for (const f of fs.readdirSync(dir).sort()) {
      if (f.endsWith('.md') && !f.startsWith('_')) files.push(path.join('content', 'blog', f));
    }
  }

  let rc = 0;
  const report = {};
  for (const file of files) {
    const text = file === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(file, 'utf8');
    const findings = lint(text.replace(/\r\n/g, '\n'), opts.spelling);
    if (findings.some((f) => f.level === 'block') || (opts.strict && findings.length)) rc = 1;
    if (opts.json) report[file] = findings;
    else console.log(`=== ${file} ===\n${format(findings)}\n`);
  }
  if (opts.json) console.log(JSON.stringify(report, null, 2));
  return rc;
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));

module.exports = { lint };

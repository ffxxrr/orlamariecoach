import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
	// root: '..', // Reverted: Keep root relative to this config file (app/)
	site: process.env.CI
		? 'https://themesberg.github.io'
		: `http://localhost:${DEV_PORT}`,
	base: process.env.CI ? '/flowbite-astro-admin-dashboard' : undefined,

	output: 'server',

	/* Like Vercel, Netlify,… Mimicking for dev. server */
	// trailingSlash: 'always',

	server: {
		/* Dev. server only */
		port: DEV_PORT,
	},

	// Explicitly tell Vite where to load .env files from and which prefixes to expose
	vite: {
		envDir: '.',
		envPrefix: ['VITE_', 'PUBLIC_', 'PRIVATE_'], // Include PRIVATE_ prefix
	},

	integrations: [
		//
		sitemap(),
		tailwind(),
		node({
			mode: 'standalone', // Creates a self-contained server entrypoint
		}),
	],
});

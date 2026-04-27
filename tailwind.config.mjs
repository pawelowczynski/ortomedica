/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'brand-carmine': '#BE1433',
				'brand-steel': '#1A3A79',
				'brand-blue': '#009BD5',
				// Backward-compatible aliases for existing utility classes.
				navy: '#1A3A79',
				'navy-light': '#1A3A79',
				gold: '#BE1433',
				'gold-light': '#D94A64',
				'gray-soft': '#f8f9fa',
				primary: '#1A3A79',
				accent: '#BE1433',
				secondary: '#009BD5',
			},
		},
	},
	plugins: [],
}


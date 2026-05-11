/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'brand-carmine': '#BE1433',
				'brand-steel': '#1A3A79',
				'brand-blue': '#009BD5',
				'brand-gold': '#b2945e',
				'brand-gold-light': '#d4bc8d',
				'brand-gold-dark': '#8f6f3d',
				navy: '#1A3A79',
				'navy-light': '#1A3A79',
				gold: '#b2945e',
				'gold-light': '#d4bc8d',
				'gray-soft': '#f8f9fa',
				'surface-soft': '#f6f4ef',
				'surface-warm': '#faf8f5',
				primary: '#1A3A79',
				accent: '#BE1433',
				secondary: '#009BD5',
			},
		},
	},
	plugins: [],
}

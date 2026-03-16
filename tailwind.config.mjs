/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				navy: '#0a192f',
				'navy-light': '#112240',
				gold: '#b2945e',
				'gold-light': '#d4bc8d',
				'gray-soft': '#f8f9fa',
			},
		},
	},
	plugins: [],
}


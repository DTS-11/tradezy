/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#E84C3D', // logo red
				primary_hover: '#D94335',
				secondary: '#34AADC', // blue
				secondary_hover: '#2B91C5',
				tertiary: '#FFB84D', // yellow
				tertiary_hover: '#E6A441'
			}
		}
	},
	plugins: []
};

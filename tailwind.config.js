/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "480px",
			// => @media (min-width: 480px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			colors: {
				brightRed: "hsl(12, 88%, 59%)",
				brightRedLight: "hsl(12, 88%, 69%)",
				brightRedSupLight: "hsl(12, 88%, 95%)",
				darkBlue: "hsl(228, 39%, 23%)",
				darkGrayishBlue: "hsl(227, 12%, 61%)",
				veryDarkBlue: "hsl(233, 12%, 13%)",
				veryPaleRed: "hsl(13, 100%, 96%)",
				veryLightGray: "hsl(0, 0%, 98%)",
				veryLightWhitishBlue: "#1893F8",
				whitegrey: "#F7F7F7",
				bluedark: "#002248",
				finalblue: "#1893F8",
				darkgreyishblue: "#697687",
				homeBlue: "#054580",
				ash: "#6B6B6B",
			},
			fontFamily: {
				Montserrat: ["Montserrat", "sans-serif"],
				Fraunces: ["Fraunces", "serif"],
				Fontdiner: ["Fontdiner Swanky", "cursive"],
			},
			scale: {
				'120': '1.2', // Custom scale for larger card
				'90': '0.9', // Custom scale for smaller cards
			  },
			  zIndex: {
				'10': '10', // Custom z-index for centered card
			  },
		},
		animation: {
			slideIn: "animate-slideIn ease-in-out duration-300",
			slideOut: "animate-slideOut ease-in-out duration-300",
			fadeIn: "fadeIn 1s ease-in-out",
       		fadeOut: "fadeOut 1s ease-in-out",
		},
		keyframes: {
			fadeIn: {
			  '0%': { opacity: '0' },
			  '100%': { opacity: '1' },
			},
			fadeOut: {
			  '0%': { opacity: '1' },
			  '100%': { opacity: '0' },
			},
		},
	},
	plugins: [],
};

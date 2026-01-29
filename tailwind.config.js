/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                safari: {
                    50: '#f1f3e8',
                    100: '#e1e6cf',
                    200: '#c3ce9f',
                    300: '#a5b56f',
                    400: '#879d3f',
                    500: '#5b6339', // Moss Green (Primary)
                    600: '#4a512d',
                    700: '#393f21',
                    800: '#2b3d26', // Deep Jungle (Dark Green)
                    900: '#1e2b1b',
                    950: '#0f150d',
                },
                secondary: {
                    50: '#fef2d0', // Cream (Background)
                    100: '#fde8b1',
                    200: '#fbd174',
                    300: '#f9ba37',
                    400: '#d5a054', // Sandy Gold
                    500: '#c1863f',
                    600: '#a25b27', // Terracotta
                    700: '#8a4d21',
                    800: '#723f1b',
                    900: '#5a3115',
                    950: '#2a1509',
                }
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

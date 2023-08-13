/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backSVG': "url(./src/Assets/BACKGROUND.svg)"
      },
      colors: {
        "priBlue": "#2151F5",
        "secBlue": "#DBE6FE",
        "priBlack": "#0C0C0C",
        "secBlack": "#1E1E1E"
      },

      padding: {
        "Large": "150px",
        "small": "20px"
      }
    },
  },
  plugins: [],
}


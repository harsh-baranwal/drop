/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'suisse': ['Suisse Works Bold'],
      },
      colors: {
        'primary': '#8b5cf6',
        'mainbg': '#f5f7fb'
      },
      screens: {
        'mdmax': {'max': '768px'},
        'smax': {'max': '500px'}
      },
    },
  },
  plugins: [],
}


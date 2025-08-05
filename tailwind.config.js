/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          pink: '#E4405F',
          purple: '#833AB4',
          orange: '#F77737',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #833AB4, #C13584, #E4405F, #F77737)',
        'instagram-soft': 'linear-gradient(135deg, #833AB4 0%, #E4405F 100%)',
      }
    },
  },
  plugins: [],
}
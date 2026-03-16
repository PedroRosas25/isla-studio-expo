/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zinc-950': '#09090b', 
        'brand-blue': '#007AFF', 
        'brand-cream': '#F4F4F5', 
        'mining-dark': '#18181b', 
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], 
        'sans': ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
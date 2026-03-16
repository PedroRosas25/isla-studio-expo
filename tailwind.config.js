/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#007AFF', 
        'brand-dark': '#292A2C', 
        'brand-cream': '#F5F2EB', 
        'brand-grey': '#B0B0B0', 
        'mining-dark': '#0a0a0a', // Mantenemos este para los fondos
      },
      fontFamily: {
        // Ahora 'sans' usará Montserrat por defecto en toda la web
        sans: ['Montserrat', 'sans-serif'],
        // 'serif' usará Playfair Display para los títulos elegantes
        serif: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
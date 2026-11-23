/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial de ISLA STUDIO
        'isla-black': '#2B2522',
        'isla-green': '#384C37',
        'isla-terra': '#C87962',
        'isla-almond': '#F4EAE5',
      },
      fontFamily: {
        // Reemplazamos la fuente 'sans' por defecto con Montserrat
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
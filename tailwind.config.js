/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 agregar esta línea
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: '#1E3A8A',
        secundario: '#2563EB',
        fondoClaro: '#E0F2FE',
        texto: '#1F2937',
      },
    },
  },
  plugins: [],
}

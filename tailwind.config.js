/** @type {import('tailwindcss').Config} */
export default {
  // Rutas donde Tailwind buscará clases para generar los estilos finales
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // Colores personalizados que podemos usar en toda la app
      colors: {
        primary: '#2563eb',   // Azul principal
        secondary: '#1e293b', // Gris oscuro para fondos o encabezados
      },
    },
  },

  // Aquí podríamos añadir plugins si los necesitamos más adelante
  plugins: [],

    // Activamos el modo oscuro usando la clase 'dark' en el elemento raíz
  darkMode: 'class',
}

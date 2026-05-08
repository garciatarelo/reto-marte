import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Establecer base absoluta para la subcarpeta de alwaysdata para prevenir errores 404
  base: '/marsmatrix/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    assetsDir: 'assets',
  }
})
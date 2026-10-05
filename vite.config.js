import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' usa rutas relativas: la app funciona en GitHub Pages
// sin importar el nombre del repositorio (https://usuario.github.io/<repo>/)
export default defineConfig({
  plugins: [react()],
  base: './',
})

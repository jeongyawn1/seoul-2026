import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site → base must match the repository name.
export default defineConfig({
  plugins: [react()],
  base: '/seoul-2026/',
})

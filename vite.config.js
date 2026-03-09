import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/my-portfolio-api-site/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


// Denne filen er for å konfigurere Vite, som er byggverktøyet vi bruker. Den setter opp React-pluginen, definerer en alias for enklere importering av filer, og setter base URL for å sikre at data-hentingen fungerer på GitHub Pages.

     // "@" er et alias for src/-mappen.
     // Gjør at du kan skrive @/config/... i stedet for ../../../config/...
    // Fungerer i både .jsx-filer og .css-filer.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones desde cualquier IP
    allowedHosts: [
      'https://marinochoa.surcodes.com/', // Permite cualquier subdominio de ngrok
      'https://marinochoa.com/', // Permite cualquier subdominio de ngrok
    ]
  }
})

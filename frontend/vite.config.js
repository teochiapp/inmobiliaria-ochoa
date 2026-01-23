import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones desde cualquier IP
    allowedHosts: [
      'f00550ad169c.ngrok-free.app',
      '.ngrok-free.app', // Permite cualquier subdominio de ngrok
      '.ngrok.io',
      '.ngrok.app'
    ]
  }
})

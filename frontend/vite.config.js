import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones desde cualquier IP
    allowedHosts: [
      'marinochoa.surcodes.com',
      'api.marinochoa.surcodes.com',
      'marinochoa.com',
      'api.marinochoa.com',
      'https://marinochoa.com.ar',
      'https://marinochoa.com.ar/admin',
      'https://marinochoa.com.ar/api',
      'https://api.marinochoa.com.ar/api',
      'https://marinochoa.com.ar',
      'https://marinochoa.com.ar/admin',
      'https://marinochoa.com.ar/api',
      'https://api.marinochoa.com.ar/ap',
    ]
  }
})

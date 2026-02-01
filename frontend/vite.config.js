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
      'https://api.marinochoa.surcodes.com/admin',
      'https://api.marinochoa.surcodes.com',
      'marinochoa.com',
      'api.marinochoa.com',
      'marinochoa.com.ar',
      'api.marinochoa.com.ar',
    ]
  }
})

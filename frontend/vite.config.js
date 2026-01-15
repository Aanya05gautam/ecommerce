import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // allow all hosts
    allowedHosts: ['ecommerce-frontend-ljqe.onrender.com'], // your Render URL
    port: 4173 // optional, your preview port
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Escuchar en 0.0.0.0 para que Replit pueda enrutar las peticiones
    // Permitir host de Replit (*.replit.dev) y localhost en desarrollo
    allowedHosts: ['localhost', '.replit.dev', 'replit.dev'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

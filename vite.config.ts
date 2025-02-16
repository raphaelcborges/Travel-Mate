import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite acesso de qualquer IP
    port: 5173, // Mantém a porta fixa
    strictPort: true, // Garante que a porta não mude
    cors: true, // Permite acesso de origens externas
    hmr: {
      clientPort: 443, // Resolve bloqueios de WebSocket com ngrok
    },
    allowedHosts: ["all"], // Permite qualquer host acessar o servidor
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

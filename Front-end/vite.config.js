import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
import path from "path"

dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        onProxyReq(proxyReq) {
          console.log(`Proxy request to: ${proxyReq.path}`);
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});

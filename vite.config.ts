import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/_tests_/setup.ts",
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self' http://localhost:3001; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
    },
  },
  build: {
    // For production, use a more restrictive CSP without unsafe-eval
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/tasks": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/account": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/whoami": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});

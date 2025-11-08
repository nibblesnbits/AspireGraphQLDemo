import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler", "relay"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  server: {
    port: 5050,
    proxy: {
      "^/auth/.*": {
        target: "http://localhost:5555",
        rewrite(path) {
          return path.replace(/^\/auth/, "");
        },
        changeOrigin: true,
        headers: {
          "X-Forwarded-Host": "localhost",
          "X-Forwarded-Port": "5050",
        },
      },
      "/graphql": {
        target: "http://localhost:5129",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});

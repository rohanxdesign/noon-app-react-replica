import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { port: 7272, strictPort: true, host: true },
  plugins: [
    react(),
    {
      name: "serve-flow-as-root",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html") {
            req.url = "/flow.html";
          }
          next();
        });
      },
    },
  ],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { port: 5555, strictPort: true },
  plugins: [
    react(),
    {
      name: "serve-collection-as-root",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html") {
            req.url = "/collection.html";
          }
          next();
        });
      },
    },
  ],
});

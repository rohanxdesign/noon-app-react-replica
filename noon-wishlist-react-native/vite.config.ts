import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:         resolve(__dirname, "index.html"),
        wishlist:     resolve(__dirname, "wishlist.html"),
        bottomsheets: resolve(__dirname, "bottomsheets.html"),
        collection:   resolve(__dirname, "collection.html"),
        multiselect:  resolve(__dirname, "multiselect.html"),
        toast:        resolve(__dirname, "toast.html"),
        embedDrawer:  resolve(__dirname, "embed-drawer.html"),
      },
    },
  },
});

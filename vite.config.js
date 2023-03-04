import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(), VitePWA()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/OpenSourceCasino/",
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "img/[name]-[hash][extname]";
          } else if (/\.css$/.test(name ?? "")) {
            return "css/[name]-[hash][extname]";
          } else if (/\.js$/.test(name ?? "")) {
            return "js/[name]-[hash][extname]";
          }
          return "[name]-[hash][extname]";
        },
      },
    },
  },
});

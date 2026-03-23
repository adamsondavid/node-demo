import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nitro } from "nitro/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue(), nitro()],
  nitro: {
    sourcemap: true,
    serverEntry: "src/server/main.ts",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

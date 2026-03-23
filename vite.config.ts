import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nitro } from "nitro/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue(), nitro()],
  nitro: {
    sourcemap: true,
    serverEntry: process.env.NODE_ENV === "development" ? "src/server/main.local.ts" : "src/server/main.cloud.ts",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

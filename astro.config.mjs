// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import bun from "@wyattjoh/astro-bun-adapter";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: bun(),
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Poppins",
      cssVariable: "--font-poppins",
    },
  ],
  env: {
    schema: {
      PUBLIC_API_BASE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321/api/v1",
      }),
    },
  },
  integrations: [svelte()],
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
});

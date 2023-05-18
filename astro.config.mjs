import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    svelte(),
  ],
  vite: {
    plugins: [yaml()],
  },
});

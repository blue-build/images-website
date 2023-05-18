/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        ubrut: "0.25rem 0.25rem 0px 0px rgb(30 64 175 / var(--tw-bg-opacity))",
      },
    },
  },
  plugins: [],
};

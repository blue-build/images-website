/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        ubrut:
          "0.25rem 0.25rem 0px 0px rgb(var(--color-bg-secondary) / var(--tw-bg-opacity))",
      },
      colors: {
        // Using modern `rgb`
        fg: {
          primary: "rgb(var(--color-fg-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-fg-secondary) / <alpha-value>)",
        },
        bg: {
          page: "rgb(var(--color-bg-page) / <alpha-value>)",
          primary: "rgb(var(--color-bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-bg-secondary) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};

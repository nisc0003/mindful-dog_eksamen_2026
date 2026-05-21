// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
<<<<<<<< HEAD:prettier.config.mjs
  plugins: ["prettier-plugin-astro"],
========
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
>>>>>>>> feature/Tailwind.css:.prettierrc.mjs
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

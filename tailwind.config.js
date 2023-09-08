/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#a78bfa",
          "secondary": "#9333ea",
          "accent": "#07c64a",
          "neutral": "#271b32",
          "base-100": "#101010",
          "info": "#8ad1f0",
          "success": "#50e7ce",
          "warning": "#f6c151",
          "error": "#f04c83",
        },
      },
    ],
  },
}


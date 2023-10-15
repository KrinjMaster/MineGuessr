/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,svg}'],
  theme: {
    extend: {
      animation: {
        blob_pulse: 'blob_pulse 10s linear infinite',
        blob_pulse2: 'blob_pulse 15s linear infinite',
      },
      keyframes: {
        'blob_pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
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
      "light",
    ],
  },
}


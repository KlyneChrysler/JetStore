/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Dancing Script"', "sans-serif"],
        playfair: ['"Playfair Display"', "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        spaceMono: ['"Space Mono"', "monospace"],
        robotoMono: ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

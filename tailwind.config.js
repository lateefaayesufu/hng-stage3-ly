/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
]
export const theme = {
  extend: {
    colors: {
      black: "#101010",
      "dark-salmon": "#D87D4A",
      salmon: "#fbaf85",
      grey: "#F1F1F1",
    },
    screens: {
      sm: { max: "639px" },
    },
  },
}
export const plugins = []

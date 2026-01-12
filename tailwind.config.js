/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: 'class' strategy allows you to toggle dark mode manually via your Context/NativeWind
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
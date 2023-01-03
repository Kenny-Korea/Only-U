/** @type {import('tailwindcss').Config} */
module.exports = {
  // 아래의 content에 확장자 설정을 해줘야 tailwind 적용됨
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        main: ["Andika"],
      },
      colors: {
        header: "#eeccff",
        brightRed: "hsl(12, 88%, 59%)",
        brightPink: "RGB(214, 80, 118)",
        textPink: "rgb(255, 111, 97)",
      },
    },
  },
  plugins: [],
};

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
        bgColor: "#F7F7F7",
        starColor: "rgb(234, 179, 8)",
        sub: "rgb(255,87,100)",
        // mainColor: "#FF6667",
        main: "#FF766B",
        // main: "#C8A2C8", 라일락
        textBlack: "#4A4A4A",
      },
      boxShadow: {
        test: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        addButton: "0px 0px 8px 2px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};

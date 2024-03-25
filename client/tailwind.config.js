/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px", // xs
      custom: "528px", // sm
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "2xl": "1760px",
    },
    // Inkludera din anpassade färgpalett här om nödvändigt
    extend: {
      colors: {
        one: "#F7FBFC",
        two: "#F1F6F9",

        // border colors
        borderOne: "#e4edf2",
        borderTwo: "#dae3e8",

        // Andra färger...
        main: "#04BE68",
        mainHover: "#04af5f",
        mainActive: "#079253",

        txtColor: "#212A3E",
        txtColorTwo: "#1E3059",
        txtInput: "#616773",
      },
    },
    ph1: {
      fontSize: "18px",
      fontWeight: "800",
    },
    bajs: {
      custom: "0px 28px 67px -48px",
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        h1: {
          fontSize: "32px", // Standardstorlek
          fontWeight: "900",

          "@screen lg": {
            fontSize: "40px",
          },
        },
        h2: {
          fontSize: "24px", // Standardstorlek
          fontWeight: "700",

          "@screen lg": {
            fontSize: "32px",
          },
        },
        h3: {
          fontSize: "20px", // Standardstorlek
          fontWeight: "500",

          "@screen lg": {
            fontSize: "28px",
          },
        },
        p: {
          fontSize: "14px", // Standardstorlek
          fontWeight: "400",

          "@screen xl": {
            fontSize: "16px",
          },
        },
        button: {
          fontSize: "14px", // Standardstorlek
          fontWeight: "400",
          margin: "8px 0px",
          "@screen lg": {
            fontSize: "16px",
          },
        },
        main: {
          padding: "8px 16px", // Standardstorlek
          "@screen md": {
            padding: "16px 32px",
          },
          "@screen lg": {
            padding: "32px 64px",
          },
          "@screen xl": {
            padding: "64px 128px",
          },
          "@screen 2xl": {
            padding: "16px 256px ",
          },
        },
        "input[type=text], input[type=number], input[type=email]": {
          border: "2px solid #616773",
          outline: "none",
          background: "none",
        },
        "input[type='text'].tag": {
          border: "none",
          outline: "none",
          background: "none",
        },
        'input[type="text"]:focus, input[type=number]:focus': {
          borderColor: "#616773",
        },
        'input[type="text"]:active, input[type=number]:active': {
          borderColor: "#04BE68",
        },
        'input[type="text"]:disabled, input[type=number]:disabled': {
          backgroundColor: "#cbd5e0",
        },
        // ... andra taggar och stilar
      });
    },
  ],
};

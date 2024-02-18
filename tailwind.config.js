/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      screens: {
        sm: "380px",
        md: "520px",
        lg: "768px",
        xl: "1024px",
        pc: "1400px",
      },
      colors: {
        default: {
          bg: "#212121",
          hover: "#1f2933",
        },
        success: {
          bg: "#047857",
          hover: "#065f46",
        },
        destructive: {
          bg: "#e11d48",
          hover: "#d00f2b",
        },
        warning: {
          bg: "#ea580c",
          hover: "#d0470d",
        },
        primary: {
          bg: "#1862a8",
          hover: "#145489",
        },
        wheat: {
          bg: "#fefefe",
          hover: "#ddd",
        },
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
};

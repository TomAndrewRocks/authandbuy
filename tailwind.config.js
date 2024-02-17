/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        sm: '380px',
        md: '420px',
        lg: '680px',
        tablet: '1024px',
      },
      colors: {
        default: {
          bg: '#374151',
          hover: '#1f2933',
        },
        success: {
          bg: '#047857',
          hover: '#065f46',
        },
        destructive: {
          bg: '#e11d48',
          hover: '#d00f2b',
        },
        warning: {
          bg: '#ea580c',
          hover: '#d0470d',
        },
        info: {
          bg: '#1862a8',
          hover: '#145489',
        },
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
};

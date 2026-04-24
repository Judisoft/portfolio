/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        matrix: {
          bright: '#00ff41',
          green:  '#00cc33',
          mid:    '#008f11',
          dim:    '#004d00',
          dark:   '#001a00',
          black:  '#000000',
        },
      },
      fontFamily: {
        sans: ['"JetBrains Mono"', '"Courier New"', 'Courier', 'monospace'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        float:        'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink:        'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}

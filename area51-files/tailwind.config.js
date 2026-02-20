/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fbi': {
          'dark': '#0a1628',
          'blue': '#1e3a5f',
          'gold': '#c5a846',
          'red': '#8b0000',
          'light': '#f5f5f5',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Consolas', 'Monaco', 'monospace'],
        'serif': ['Times New Roman', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

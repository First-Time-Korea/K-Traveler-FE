/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: {
          50: '#f0f8ff',
          100: '#dfefff',
          200: '#b8e0ff',
          300: '#5fbdff',  // default
          400: '#33adfd',
          500: '#0992ee',
          600: '#0073cc',
          700: '#005ba5',
          800: '#044e88',
          900: '#0a4270',
          950: '#06294b'
        },
        second: {
          50: '#f5f6f8',
          100: '#ecf1f3',
          200: '#dce5e9',
          300: '#c7d3da',
          400: '#afbdca',
          500: '#9eadbd',  // default
          600: '#8392a8',
          700: '#707d92',
          800: '#5c6677',
          900: '#4e5661',
          950: '#2e3338'
        },
        third: {
          50: '#fdf2f7',
          100: '#fbe8f2',
          200: '#fad0e6',
          300: '#f598c5',  // default
          400: '#f076af',
          500: '#e74d90',
          600: '#d62c6e',
          700: '#b91d55',
          800: '#991b47',
          900: '#801b3e',
          950: '#4e0920'
        }
      }
    },
  },
  plugins: [],
}
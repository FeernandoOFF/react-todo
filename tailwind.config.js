module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class",
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary-dark': '#031956',
      'secondary-dark': '#00123e',
      'primary-light': '#f2e4c4',
      'secondary-light': '#b4cdf2',
      'accent': '#f269bc',
     }),
    container:{
      center:true,
    },
    extend: {},
  },
  colors:{
    "primary-dark":"#282c34",
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

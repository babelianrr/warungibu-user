const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dnr: {
          orange: '#FBEEE3',
          beige: '#FFF1E5',
          'soft-blue': '#94B2E1',
          'light-blue': '#F3FAFC',
          blue: '#0E75ED',
          'blue-light': '#E2F8FF',
          gray: '#FAFAFA',
          'dark-orange': '#F88115',
          shopee: '#FD5F32',
          pastel: '#FBEEE3',
          green: '#A4D601',
          'dark-green': '#A7BD06',
          yellow: '#EBFF03',
          'dark-blue': '#1B4380',
          turqoise: '#2394BA',
          'light-turqoise': '#219BA5',
          'dark-turqoise': '#2386A7',
          white: '#FAFAFA',
          'secondary-gray': '#f7f7f7',
          'slider-orange': '#ED690E',
          'light-gray': '#707070',
          primary: '#F09538',
        },
        wi: {
          blue: '#47BFE6 ',
          'blue-light': '#E2F8FF',
          bicart: '#F09538',
          'light-wi': '#F9AC5D',
          'dark-wi': '#1dabd9',
        },
      },
      fontFamily: {
        sans: ['Circular', ...defaultTheme.fontFamily.sans],
        dayOne: ['Days One', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        tiny: '.85rem',
        xxs: '.55rem',
      },
      lineHeight:{
        xxs: '.55rem',
      },
      width: {
        120: '32rem',
        130: '40rem',
      },
      fill(theme) {
        return {
          'orange-primary': "#ed690e",
          'dnr-orange': theme('colors.dnr.orange'),
          'wi-blue': theme('colors.wi.blue'),
          'dnr-green': theme('colors.dnr.green'),
        }
      },
      spacing: {
        200: '200%',
      },
      minHeight: {
        base: '800px',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      borderRadius: ['hover'],
      boxShadow: ['hover'],
      fill: ['hover'],
      backgroundColor: ['odd', 'even'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        menuPrimary: '#7CCBFF',
        primary: '#18A0FB',
        menuBackground: '#E0F3FF',
        primaryHover: '#4DB3F8',
        chevronGrey: '#C4C4C4',
        statsGrey: '#BDBDBD',
        statsCircleGrey:'#E7E7E7',
        statsBlack: '#4F3A57',
        callStatsLegend: '#BB6BD9',
        musicStatsLegend: '#6FCF97',
        galleryStatsLegend: '#EB5757',
        primaryGrey: '#BFBFBF',
        secondaryGrey: '#D0D0D0',
        secondary: '#C8E9FF',
      },
      borderRadius: {
        'largeCorner': '45px',
        'mediumCorner': '15px',
        'smallCorner': '10px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

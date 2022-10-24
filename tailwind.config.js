module.exports = {
  content: ['./src/views/**/*.tsx', './src/views/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-france-sun': {
          base: '#000091',
          hover: '#1212ff',
          active: '#2323ff',
        },
        'blue-france-975': {
          base: '#f5f5fe',
          hover: '#dcdcfc',
          active: '#cbcbfa',
        },
        'blue-france-main-525': {
          base: '#6a6af4',
        },
        'red-marianne-main-472': {
          base: '#e1000f',
          hover: '#ff292f',
          active: '#ff4347',
        },
        'red-marianne-425': {
          base: '#c9191e',
          hover: '#f93f42',
          active: '#f95a5c',
        },
        'grey-50': {
          base: '#161616',
          hover: '#343434',
          active: '#474747',
        },
        'grey-625': {
          base: '#929292',
          hover: '#bbbbbb',
          active: '#cecece',
        },
        'grey-925': {
          base: '#e5e5e5',
          hover: '#c5c5c5',
          active: '#b2b2b2',
        },
        'grey-950': {
          base: '#eee',
          hover: '#d2d2d2',
          active: '#c1c1c1',
        },
        'grey-1000': {
          base: '#ffffff',
          hover: '#f6f6f6',
          active: '#ededed',
        },
        'brown-caramel-950': {
          base: '#f7ebe5',
          hover: '#eccbb9',
          active: '#e6b79a',
        },
        'brown-caramel-main-648': {
          base: '#C08C65',
          hover: '#e6b594',
          active: '#eccab6',
        },
        'warning-425': {
          base: '#b34000',
          hover: '#ff6218',
          active: '#ff7a55',
        },
        'warning-950': {
          base: '#ffe9e6',
          hover: '#ffc6bd',
          active: '#ffb0a2',
        },
        'info-425': {
          base: '#0063cb',
          hover: '#3b87ff',
          active: '#3b87ff',
        },
        'info-950': {
          base: '#e8edff',
          hover: '#c2d1ff',
          active: '#a9bfff',
        },
        'success-425': {
          base: '#18753c',
          hover: '#27a959',
          active: '#2fc368',
        },
        'success-950': {
          base: '#b8fec9',
          hover: '#46fd89',
          active: '#34eb7b',
        },
        'error-425': {
          base: '#ce0500',
          hover: '#ff2725',
          active: '#ff4140',
        },
        'error-950': {
          base: '#ffe9e9',
          hover: '#ffc5c5',
          active: '#ffafaf',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
}

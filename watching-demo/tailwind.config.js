let path = require('path')

module.exports = {
  content: [path.resolve(__dirname, './index.html'), path.resolve(__dirname, './other.html')],
  theme: {
    colors: {
      primary: '#0088cc',
      secondary: '#0088cc',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.example': {
          color: 'red',
        },
      })
    },
  ],
}

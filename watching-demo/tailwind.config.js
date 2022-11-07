let path = require('path')

module.exports = {
  content: [__dirname + '/{index,other}.html', __dirname + '/glob-example-folder/**/*.html'],
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

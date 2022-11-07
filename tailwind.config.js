module.exports = {
  content: ['./index.html'],
  plugins: [
    // External plugin
    function ({ addUtilities }) {
      addUtilities({
        '.underline': { 'text-decoration-line': 'underline' },
      })
    },
  ],
}

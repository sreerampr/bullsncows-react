module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      'warnForDuplicates': false,
    },
    'autoprefixer': {},
    'cssnano': {}
  }
}

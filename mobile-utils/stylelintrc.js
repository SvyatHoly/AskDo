module.exports = {
  extends: ['stylelint-config-react-native-styled-components'],
  customSyntax: 'postcss-styled-syntax',
  validate: ['typescript', 'typescriptreact'],
  rules: {
    'function-allowed-list': null,
    'color-function-notation': 'legacy',
  },
}

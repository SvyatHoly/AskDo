const fs = require('fs')
const path = require('path')

const root = process.cwd()
const package = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))
const rnVersion = parseFloat(package.dependencies['react-native'].trim(), 10)
const rnConfig = rnVersion <= 0.71 ? '@react-native-community' : '@react-native'

module.exports = {
  extends: [rnConfig],
  rules: {
    'prettier/prettier': 'off',
    semi: 'off',
    eqeqeq: 'off',
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-catch-shadow': 'off',
    radix: 'off',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'array-callback-return': 'error',
    'no-constant-binary-expression': 'error',
    'no-promise-executor-return': 'error',
    'no-bitwise': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'no-delete-var': 'error',
    'no-lonely-if': 'error',
    'no-else-return': 'error',
    'no-throw-literal': 'error',
    'prefer-const': 'warn',
  },
}

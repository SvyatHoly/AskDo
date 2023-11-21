module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  modulePathIgnorePatterns: ['Detox'],
  transform: {
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': 'jest-transform-stub',
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
  setupFiles: ['<rootDir>/js/setupTestEnvironment.tsx'],
  moduleNameMapper: {
    '^reducers/(.*)': '../reducers/$1',
    '^components/(.*)': '../components/$1',
    '^utils/(.*)': '../utils/$1',
    '^constants/(.*)': '../constants/$1',
    '^actions/(.*)': '../actions/$1',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': 'jest-transform-stub',
  },
  cacheDirectory: '/tmp/jest',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testResultsProcessor: 'jest-teamcity',
  transformIgnorePatterns: ['node_modules/(?!@sweatcoin-design-system)/', 'jest-runner'],
}

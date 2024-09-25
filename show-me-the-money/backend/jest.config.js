module.exports = {
  coverageDirectory: '../__coverage__',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.mocks.ts',
    '!**/*.spec.ts',
  ],
  rootDir: 'src',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
};

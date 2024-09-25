module.exports = {
  coverageDirectory: '../__coverage__',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.mocks.ts',
    '!**/*.spec.{ts,tsx}',
  ],
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@modules/(.*)$': '<rootDir>/modules/$1',
  },
  setupFilesAfterEnv: ['../jest.setup.ts'],
};

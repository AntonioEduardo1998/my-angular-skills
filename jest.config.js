/** jest.config.js */

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts',
    '!<rootDir>/src/app/**/index.ts',
    '!<rootDir>/src/app/**/*.module.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '.*\\.mock\\.(js|ts)$',
    '.*\\.html$',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@root/(.*)$': '<rootDir>/$1',
  },
  coverageReporters: [
    'lcov',
    'text-summary',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/*.(js|scss)',
  ],
  testMatch: [
    '<rootDir>/src/app/*.spec.ts',
    '<rootDir>/src/app/**/*.spec.ts',
  ],
};

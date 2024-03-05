/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@modules/auth/(.*)$': '<rootDir>/src/modules/auth/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1'
  }
}

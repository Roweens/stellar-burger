import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  rootDir: './',
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts'
  },
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>src'],
  globals: {
    __PROJECT__: 'jest'
  }
};

export default config;

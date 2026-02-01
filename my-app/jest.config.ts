import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
export default {
    moduleFileExtensions: [
      'mjs',
      'js',
    ],
    setupFilesAfterEnv: ['./jest.setup.mjs'],
    testMatch: ['**/?(*.)+(spec|test).(m)js'],
    verbose: true,
    transform: {
      '^.+\\.mjs$': 'babel-jest',
    },
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  };

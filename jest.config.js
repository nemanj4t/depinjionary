module.exports = {
  rootDir: 'test',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ["../jest-setup-file.ts"]
};

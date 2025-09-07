// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupDb.js'], // ✅ add
  verbose: true,
};

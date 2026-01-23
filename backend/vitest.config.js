import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'backend',
    environment: 'node',
    globals: true,
    include: ['**/*.test.js'],
  },
});

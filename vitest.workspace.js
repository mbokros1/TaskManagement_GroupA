import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  './frontend/vite.config.js',
  './backend/vitest.config.js',
]);

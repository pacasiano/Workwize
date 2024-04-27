import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
  globals: true,
  environment: "jsdom",
  setupFiles: ["Frontend/test/setupTest.js"],
  testMatch: ['Frontend/test/**/*.test.jsx'],
  },
});
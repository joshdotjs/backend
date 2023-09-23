/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,

    // Update the includeSource config for Vitest to grab the files under src/:
    includeSource: ['src/**/*.{js,ts}'], // In Source Testing: https://vitest.dev/guide/in-source.html
  },
})
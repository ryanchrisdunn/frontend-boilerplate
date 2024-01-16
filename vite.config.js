import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/services/api'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@constants': path.resolve(__dirname, 'src/services/constants'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@svgs': path.resolve(__dirname, 'src/assets/svgs'),
      '@protectedRoutes': path.resolve(__dirname, 'src/routes/protectedRoutes'),
      '@router': path.resolve(__dirname, 'src/routes'),
    },
  },
})

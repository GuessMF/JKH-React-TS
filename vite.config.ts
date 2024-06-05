import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/JKH-React-TS/',
  server: {
    proxy: {
      '/api': 'http://showroom.eis24.me',
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://showroom.eis24.me',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});

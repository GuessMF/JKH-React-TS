import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/JKH-React-TS/',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://showroom.eis24.me',
  //       changeOrigin: true,
  //       rewrite: (path) => {
  //         console.log('Rewriting path:', path); // Add this line for debugging
  //         return path.replace(/^\/api/, '');
  //       },
  //       configure: (proxy, options) => {
  //         proxy.on('proxyReq', (proxyReq, req, res) => {
  //           console.log('Proxying request:', req.url); // Add this line for debugging
  //         });
  //       },
  //     },
  //   },
  // },
});

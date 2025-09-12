import { reactRouter } from '@react-router/dev/vite'
import svgr from '@svgr/rollup'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    svgr({
      exportType: 'named',
      ref: true,
      svgo: false,
      titleProp: true,
      include: '**/*.svg',
    }),
  ],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@assets': path.resolve(__dirname, './public/assets'),
    },
  },
})

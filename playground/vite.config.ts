import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import vue from '@vitejs/plugin-vue'
import FontAwesome from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    vue(),
    FontAwesome({}),
  ],
})

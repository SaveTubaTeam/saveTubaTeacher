import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  //setting output directory to 'dist', which we've specified as our build folder for Firebase Hosting
  },
})

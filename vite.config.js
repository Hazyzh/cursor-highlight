import { defineConfig } from 'vite';

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON=="true" ? './' : ".",
});

import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'mv-keycloak.js',
  output: {
    file: 'index.js',
    name: "MvKeycloak",
    format: 'iife'
  },
  plugins: [nodeResolve()]
};
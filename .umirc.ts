import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3001/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    },
  },
});

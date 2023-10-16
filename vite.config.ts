import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import Analyze from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig, loadEnv } from 'vite'
import Checker from 'vite-plugin-checker'
import EslintPlugin from 'vite-plugin-eslint'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import Pages from 'vite-plugin-pages'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.BASE,
    resolve: {
      alias: {
        stream: 'stream-browserify',
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      react(),
      Checker({ typescript: true }),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
      Pages({
        dirs: [{ dir: 'src/pages', baseRoute: env.BASE || '' }],
        exclude: ['**/[A-Z]*.tsx'],
        importMode: 'sync',
      }),
      Unocss(),
      AutoImport({
        imports: ['react'],
        dts: './src/auto-imports.d.ts',
        resolvers: [
          IconsResolver({
            componentPrefix: 'Icon',
          }),
        ],
      }),
      EslintPlugin(),
      Analyze(),
      nodePolyfills(),
    ],
    build: {
      commonjsOptions: {
        ignoreTryCatch: (id) => id !== 'stream',
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-router-dom', 'react-dom'],
            'ui-vendor': ['antd'],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api/': {
          target: 'https://alpha.kirby.network/',
          changeOrigin: true,
        },
      },
    },
  }
})

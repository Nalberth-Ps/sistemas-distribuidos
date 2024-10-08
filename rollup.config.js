import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy-watch'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'bundle',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss({
      extensions: ['.css'],
      extract: 'main.css',
      config: {
        path: './postcss.config.cjs',
      },
    }),
    copy({
      watch: 'index.html',
      targets: [{ src: 'index.html', dest: 'dist' }],
    }),
    serve({
      open: true,
      contentBase: 'dist',
      port: 3001,
      historyApiFallback: true,
    }),
    livereload({
      watch: 'dist',
    }),
  ],
  watch: {
    include: ['src/**', 'index.html'],
    clearScreen: false,
  },
}

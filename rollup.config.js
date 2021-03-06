import typescript from 'rollup-plugin-typescript2'
// import prettier from 'rollup-plugin-prettier'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import cleaner from 'rollup-plugin-cleaner'
import svgr from '@svgr/rollup'

import pkg from './package.json'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    // prettier({
    //   cwd: './.prettierrc',
    //   sourcemap: false,
    // }),
    cleaner({
      targets: ['./build/'],
    }),
    postcss({
      modules: false,
      extract: true,
      minimize: true,
      sourceMap: true,
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      tsconfig: 'tsconfig.json',
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.(tsx|ts)', 'src/__mocks__'],
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
      },
    }),
  ],
}

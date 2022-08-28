import { resolve as resolvePath } from 'path';
import { rules, resolve, externals } from '../../webpack.common';
import { resolveTsAliases } from 'resolve-ts-aliases';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';
const mode = (process.env.MODE ?? 'production') as 'development' | 'production';
const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  mode,
  target: 'electron-main',
  devtool: 'inline-source-map',
  entry: resolvePath(__dirname, 'src/main.ts'),
  output: {
    path: resolvePath(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules,
  },
  resolve: {
    ...resolve,
    alias: resolveTsAliases(resolvePath(__dirname, 'tsconfig.json')),
  },
  externals,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: resolvePath(__dirname, 'tsconfig.json') },
    }),
  ],
};

export default mainConfig;

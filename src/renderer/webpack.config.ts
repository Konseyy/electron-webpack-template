import { resolve as resolvePath } from 'path';
import htmlPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { plugins, rules, resolve, externals } from '../../webpack.common';
import type { Configuration, RuleSetRule } from 'webpack';
import { resolveTsAliases } from 'resolve-ts-aliases';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const cssLoaderOptions = {
  sourceMap: true,
  modules: {
    auto: true,
    localIdentName: '[local]_[hash:base64]',
  },
};

const sassLoaderOptions = {
  sourceMap: true,
  sassOptions: {
    outputStyle: 'compressed',
  },
};

const extraRules: RuleSetRule[] = [
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: cssLoaderOptions,
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: cssLoaderOptions,
      },
      {
        loader: 'sass-loader',
        options: sassLoaderOptions,
      },
    ],
  },
];
const mode = (process.env.MODE ?? 'production') as 'development' | 'production';
const rendererConfig: Configuration = {
  mode,
  module: {
    rules: [...rules, ...extraRules],
  },
  externals,
  target: 'electron-renderer',
  devtool: 'inline-source-map',
  entry: resolvePath(__dirname, 'src/index.tsx'),
  output: {
    path: resolvePath(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    ...plugins,
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: resolvePath(__dirname, 'tsconfig.json') },
    }),
    new htmlPlugin({
      template: resolvePath(__dirname, 'index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    ...resolve,
    alias: resolveTsAliases(resolvePath(__dirname, 'tsconfig.json')),
  },
};

export default rendererConfig;

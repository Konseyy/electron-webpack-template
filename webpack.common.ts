import type { Configuration, RuleSetRule, WebpackPluginInstance } from 'webpack';

export const plugins: WebpackPluginInstance[] = [];

export const resolve: Configuration['resolve'] = {
  extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', 'json'],
};

export const externals: Configuration['externals'] = {};

export const rules: RuleSetRule[] = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  // WOFF Font
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset',
  },
  // WOFF2 Font
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset',
  },
  // TTF Font
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset',
  },
  // EOT Font
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset/resource',
  },
  // SVG Font
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset',
  },
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    type: 'asset/resource',
  },
];

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

console.log('==================== env ====================');
console.log({
  'process.env.NODE_ENV': process.env.NODE_ENV,
  IS_PROD,
});
console.log('=============================================\n');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: IS_PROD ? 'production' : 'development',

  entry: path.join(__dirname, 'src/index'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },

  devtool: IS_PROD ? 'source-map' : 'eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.json'],
  },

  module: {
    rules: [
      // main script loader
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      // style loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module.(sass|scss)$/,
        use: [
          'style-loader',
          IS_PROD
            ? 'css-loader'
            : {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  },
                  sourceMap: true,
                },
              },
          'sass-loader',
        ],
      },

      // html template loader
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.hbs'),
      chunks: ['main'],
      filename: 'index.html',
      minify: IS_PROD,
      title: 'Poker PC',
    }),
  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  optimization: {
    usedExports: true,
    splitChunks: {},
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};

module.exports = config;

// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const { exec } = require('child_process')
const HtmlWebpackPlugin = require("html-webpack-plugin")

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    alias: {
      CSFrontend: path.resolve(__dirname, 'src/CSFrontend'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'

    config.plugins = [
      ...config.plugins,
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
            exec('node ./dist/main.js', (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout)
              if (stderr) process.stderr.write(stderr)
            })
          })
        },
      },
    ]
  }

  return config
}

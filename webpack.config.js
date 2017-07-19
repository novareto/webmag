var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'bgetem.css',
  disable: process.env.NODE_ENV === "development"
});
const extractLESS = new ExtractTextPlugin({
  filename: 'bgetem_less.css',
  disable: process.env.NODE_ENV === "development"});


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/,
        //use: ['style-loader', 'css-loader']
        //use: isDev ? ['style-loader', 'css-loader'] 
        use: extractCSS.extract({use: ['css-loader'], fallback: 'style-loader'}) 
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.less$/,
        use: extractLESS.extract({use: [ 'css-loader', 'less-loader' ], fallback: 'style-loader'})
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    extractCSS,
    extractLESS,
    new HtmlWebpackPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

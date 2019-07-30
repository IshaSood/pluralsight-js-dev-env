
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';//For dynamic HTML referencing

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [//'whatwg-fetch',
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      inject: true //Inject true tells webpack to inject any necessary script tags forming. This means we can remove script tag from index.html in src folder
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}

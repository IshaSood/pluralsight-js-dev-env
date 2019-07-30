
import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';//For dynamic HTML referencing in production
import WebpackMD5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; //For css bundling in a separate file. Until now it was in main.js

export default {
  debug: true,
  devtool: 'source-map', //Modified Prod setting
  noInfo: false,
  entry: {//'whatwg-fetch',
    vendor: path.resolve(__dirname,'src/vendor'),// Splitting third party libraries.
    main: path.resolve(__dirname, 'src/index')
},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), //Modified Prod setting, using dist (distributin) instead of src to write files as per naming convention
    publicPath: '/',
    //filename: 'bundle.js', //Changed to below, when we started using bundle splitting in entry above (vendor.js and main.js)
    // filename: '[name].js' //Changed to  below, update filename format to use the hash that webpackmd5hash generatesfilename
    filename: '[name].[chunkhash].js' //It says name each bundle with a prefix that we define up in entrypoint, then add a dot then add a hash and then .js at end
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMD5Hash(),

    //Use CommonChunksPlugin to create a separate bundle
    //of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      minify: {                   //setting to minify our HTML
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true //Inject true tells webpack to inject any necessary script tags forming. This means we can remove script tag from index.html in src folder
    }),
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),  //New Prod setting
    // Minify JS
    new webpack.optimize.UglifyJsPlugin() //New Prod setting
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      // {test: /\.css$/, loaders: ['style','css']} // Change to below so that it calls ExtractTestPlugin
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')} //Having sourceMap in query string says that webpack should generate css sourcemap
    ]
  }
}

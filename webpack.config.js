/*learned about webpacks from: https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
It is a module bundler that works with front-end workflows*/
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
//this is our JS rule that specifies what to do with .js files
const javascript = {
    test: /\.(js)$/, // match anything that ends in `.js`
    use: [{
      loader: 'babel-loader',
      options: { presets: ['es2015'] } // pass options
    }],
  };
//post css loader
  const postcss = {
    loader: 'postcss-loader',
    options: {
      plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
    }
  };
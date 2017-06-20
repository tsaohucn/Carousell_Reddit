module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: `${__dirname}/public/js`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015','stage-3','react']
          }
        }
      }
    ]
  },
};
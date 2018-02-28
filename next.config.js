module.exports = {
  webpack(config) {
    /* config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        emitWarning: false,
      },
    }); */
    return config;
  },
};

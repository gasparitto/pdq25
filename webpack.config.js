const path = require("path");
const Terser = require("terser-webpack-plugin");

module.exports = {
  entry: "./js/script.js",
  output: {
    path: path.resolve(__dirname, "./main"),
    filename: "main.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new Terser({
        terserOptions: {
          mangle: true,
          compress: {
            drop_console: true,
            dead_code: true,
            unused: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

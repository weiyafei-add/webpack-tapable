const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Plugin1 = require("./webpackPlugins/plugin1");
const ZipPlugin = require("./webpackPlugins/zipPlugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  entry: {
    index2: "./src/index2.js",
    index: ["./src/index.js", "./src/a.js"],
  },
  mode: "development",
  output: {
    filename: "[name].[fullhash:5].js",
    clean: true,
    chunkFilename: "[name].chunk.js",
  },
  devtool: "eval-cheap-source-map",
  // externals: ["tapable"],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "esbuild-loader",
      //   options: {
      //     target: "commonjs",
      //   },
      // },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                modules: "auto",
                targets: {
                  browsers: ["last 2 versions", "ie >= 11"],
                },
              },
            ],
          ],
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: {
          idHint: "",
          reuseExistingChunk: true,
          minChunks: 2,
          priority: -20,
        },
        defaultVendors: {
          idHint: "vendors",
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/i,
          priority: -10,
        },
      },
    },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "版权信息",
    }),
    // new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new Plugin1(),
    new ZipPlugin({
      foldName: "tapable",
    }),
  ],
};

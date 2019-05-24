var path = require("path");
var webpack = require("webpack");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var distPath = __dirname + "/../public";

module.exports = {
  entry: {
    app: "./src/app/db1.module.js"
  },
  output: {
    path: distPath,
    filename: "[name].[hash].js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        core: {
          name: "core",
          chunks: "all",
          test: /brace|angular|billboard|jquery/,
          priority: -1
        },
        vendors: {
          name: "vendors",
          chunks: "all",
          test: /node_modules/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              root: path.resolve(__dirname, "..", "src/content"),
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(ico|gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      images: path.resolve(__dirname, "..", "src/content/images")
    }
  },

  plugins: [
    new webpack.ProvidePlugin({}),

    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css",
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    }),

    new webpack.ProvidePlugin({
      Popper: ["popper.js", "default"]
    })
  ],
  externals: {
    angular: "angular",
    jquery: "jQuery"
  },
  devtool: "#eval-source-map"
};

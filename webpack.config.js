const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const devMode = process.env.NODE_ENV !== "production";

console.log({devMode})

module.exports = [
  {
    mode: "production",
    entry: { main: "./src/index.js" },
    output: {
      filename: "index.js", //"[name].bundle.[hash].js",
      path: path.resolve(__dirname, "lib"),
      library: "JaganReactComponents",
      libraryTarget: "umd",
      publicPath: "/"
    },
    externals: [nodeExternals()],
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        publicPath: ".",
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: "./assets/styles/[name]-[hash].css",
        chunkFilename: "[id].css",
        ignoreOrder: false // Enable to remove warnings about conflicting order
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode,
                // if hmr does not work, this is a forceful method.
                reloadAll: true
              }
            },
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|gif|jpe?g)$/i,
          loader: "file-loader",
          options: {
              outputPath: "assets/images",
              name: "[name].[contenthash].[ext]",
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: "file-loader",
          options: {
            outputPath: "assets/fonts",
            name: "[name].[ext]",
          }
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ["csv-loader"]
        },
        {
          test: /\.xml$/i,
          use: ["xml-loader"]
        },
        {
            test: /\.js$/i,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  plugins: ["@babel/plugin-proposal-object-rest-spread"]
                }
              }
            ]
          }
      ]
    }
  }
];

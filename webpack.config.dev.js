const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

console.log({devMode})

module.exports = [
  {
    mode: "development",
    devtool: "inline-source-map",
    entry: { main: "./demo/index.js" },
    output: {
      filename: "[name].bundle.[hash].js",
      path: path.resolve(__dirname, "lib"),
      publicPath: "/",
    },
    devServer: {
      contentBase: "./lib",
      headers: {
        "X-Jagan-Langa": "running-from-webpack-dev-server"
      },
      port: 3000,
      hot: true,
      compress: true,
      clientLogLevel: "silent", // 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'
      after: (app, server) => {
        console.log("running in http://localhost:3000");
      }
    },
    plugins: [
     new HtmlWebpackPlugin({ template: "./demo/index.html" })
    ],
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|gif|jpe?g)$/,
          loader: "file-loader",
          options: {
              outputPath: "assets/images"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
          options: {
            outputPath: "assets/fonts"
          }
        },
        {
          test: /\.(csv|tsv)$/,
          use: ["csv-loader"]
        },
        {
          test: /\.xml$/,
          use: ["xml-loader"]
        },
        {
            test: /\.js$/,
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

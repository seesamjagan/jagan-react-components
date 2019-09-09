const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pkg = require("./package.json");


module.exports = ({ NODE_ENV }) => {
  const isDevMode = !NODE_ENV ? false : NODE_ENV !== "production";

  const BASE_PATH = path.resolve(__dirname);

  const entry = [path.join(BASE_PATH, "src", "index.js")];

  isDevMode && entry.push(path.join(BASE_PATH, "demo", "index.js"));

  const output = {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: {
      root: "MsysReactLibrary",
      amd: "msys-react-library",
      commonjs: "common-msys-react-library"
    },
    libraryTarget: "umd", // "var" | "this" | "window"
    pathinfo: isDevMode
  };

  const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[id].css",
      ignoreOrder: false
    })
  ];

  const include = [path.join(BASE_PATH, "src")];

  if (isDevMode) {
    plugins.splice(
      0,
      1, // remove the CleanWebpackPlugin
      new HtmlWebpackPlugin({ template: "./demo/index.html" })
    );

    include.push(path.join(BASE_PATH, "demo"));
  }

  const module = {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
              hmr: isDevMode
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        include,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  };

  const devServer = {
    contentBase: path.resolve(__dirname, "lib"),
    headers: {
      "X-Jagan-Langa": "running-from-webpack-dev-server"
    },
    port: 3000,
    hot: true,
    compress: true,
    clientLogLevel: "silent", // 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning'
    after: (app, server) => {
      console.log("running in localhost:3000");
    }
  };

  const splitChunks = {
    cacheGroups: {
      styles: {
        name: "styles",
        test: /\.css$/,
        chunks: "all",
        enforce: true
      }
    }
  };

  const devtool = isDevMode ? "eval" : "source-map"; // inline-source-map || cheap-module-eval-source-map || eval

  const externals = isDevMode
    ? {}
    : pkg.peerDependencies;/*[
        {
          react: "react"
        },
        "react-dom"
      ];*/

  return {
    mode: NODE_ENV || "production",
    entry,
    output,
    devtool,
    devServer,
    externals,
    optimization: {
      minimizer: isDevMode
        ? []
        : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
      // splitChunks, // to group all css chunk
    },
    plugins,
    module
  };
};

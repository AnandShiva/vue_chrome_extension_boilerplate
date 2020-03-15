const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const { version } = require("./package.json");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// to be changed
const prodMode = process.env.NODE_ENV === "production";

let webpackConfig = {
  mode: process.env.NODE_ENV,
  context: __dirname + "/src",
  entry: {
    "background/background": "./background/background.js",
    "options/options": "./options/options.js",
    "page_injects/index": "./page_injects/index.js",
    "popup/popup": "./popup/popup.js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": __dirname + "/src",
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  output: {
    path: __dirname + "/dist/un_packed_extension_build"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: "vue-loader"
      },
      {
        test: /\.js$/,
        loaders: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg/,
        loader: "file-loader"
      }, {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: prodMode ? "[name].[hash].css" : "[name].css",
      chunkFilename: prodMode ? "[id].[hash].css" : "[id].css",
    }),
    new CopyWebpackPlugin([
      {
        from: "icons", to: "icons"
      }, {
        from: "options/options.html", to: "options/options.html"
      }, {
        from: "popup/popup.html", to: "popup/popup.html"
      }, 
      {
        from: "manifest.json", to: "manifest.json", transform: (content) => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (webpackConfig.mode === "development" || webpackConfig.mode === "HMR") {
            jsonContent["content_security_policy"] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }
          return JSON.stringify(jsonContent, null, 2);
        }
      }
    ])
  ]
}



module.exports = (env) => {
  console.log(env)
  if (env && env.hot) {
    console.log("Inside HMR")
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
      new ExtensionReloader({
        manifest: __dirname + "/src/manifest.json",
      }),
    ]);
  }
  return webpackConfig;
};
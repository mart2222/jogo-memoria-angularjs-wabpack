var path = require("path");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var config = require("./default");
var localPort = 3000;

config.output.path = path.join(__dirname, "dist");

config.devServer = {
  contentBase: path.join(__dirname, "src/content"),
  stats: "errors-only",
  port: localPort
};

config.plugins.push(
  new OpenBrowserPlugin({
    url: "http://localhost:" + localPort
  })
);

module.exports = config;

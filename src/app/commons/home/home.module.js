const angular = require("angular");
require("./home.css");

module.exports = angular
  .module("db1.home", [])
  .controller("db1.home.HomeController", require("./home.controller")).name;

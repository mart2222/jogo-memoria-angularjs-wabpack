var angular = require("angular");

module.exports = angular
  .module("db1.filters", [])
  .filter("customTime", require("./time")).name;

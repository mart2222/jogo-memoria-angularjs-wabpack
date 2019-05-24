const angular = require("angular");

module.exports = angular.module("db1.core", [
  require("./diretivas"),
  require("./filters"),
  require("./services")
]).name;

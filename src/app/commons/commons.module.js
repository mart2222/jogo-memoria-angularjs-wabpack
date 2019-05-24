const angular = require("angular");

module.exports = angular.module("db1.commons", [
  require("./home/home.module"),
  require("./jogo/jogo.module")
]).name;

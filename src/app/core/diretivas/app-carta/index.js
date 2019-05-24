const angular = require("angular");
require("./app-carta.css");

module.exports = angular
  .module("app-carta", [])
  .directive("appCarta", require("./app-carta.directive")).name;

const angular = require("angular");
require("./jogo.css");

module.exports = angular
  .module("db1.jogo", [])
  .controller("db1.jogo.JogoController", require("./jogo.controller"))
  .config(require("./jogo.states")).name;

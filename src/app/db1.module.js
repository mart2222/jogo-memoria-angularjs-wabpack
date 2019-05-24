const angular = require("angular");
require("./db1.css");

module.exports = angular
  .module("db1", [
    "ui.router",
    require("angular-ui-bootstrap"),
    require("./core/core.module"),
    require("./commons/commons.module")
  ])
  .config(require("./db1.states")).name;

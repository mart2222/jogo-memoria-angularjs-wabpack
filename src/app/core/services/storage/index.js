const angular = require("angular");

module.exports = angular
  .module("db1.services.storage", [])
  .service("StorageService", require("./storage.service")).name;

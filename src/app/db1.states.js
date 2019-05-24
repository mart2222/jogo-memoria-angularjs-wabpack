module.exports = states;

states.$inject = ["$stateProvider", "$urlRouterProvider"];

function states($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state("main", {
      abstract: true,
      reloadOnSearch: false
    })
    .state("main.home", {
      url: "/home",
      views: {
        "@main": {
          template: require("./commons/home/home.html"),
          controller: "db1.home.HomeController as vm"
        }
      }
    });
}

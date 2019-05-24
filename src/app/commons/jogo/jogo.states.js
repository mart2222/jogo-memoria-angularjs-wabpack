module.exports = states;

states.$inject = ["$stateProvider"];

function states($stateProvider) {
  $stateProvider.state("main.jogo", {
    url: "/jogo",
    views: {
      "@main": {
        template: require("./jogo.html"),
        controller: "db1.jogo.JogoController as vm"
      }
    }
  });
}

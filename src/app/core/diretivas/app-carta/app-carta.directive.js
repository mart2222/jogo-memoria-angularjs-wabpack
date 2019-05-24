module.exports = diretiva;

function diretiva() {
  return {
    restrict: "E",
    template: require("./app-carta.html"),
    scope: {
      carta: "=",
      click: "&"
    },
    bindToController: true,
    controller: Controller,
    controllerAs: "vm"
  };
}

Controller.$inject = [];

function Controller() {
  const vm = this;

  vm.getImageCard = () => {
    return {
      background: vm.carta.image
        ? `url(${vm.carta.image}) no-repeat center center`
        : "",
      "background-size": "cover"
    };
  };
}

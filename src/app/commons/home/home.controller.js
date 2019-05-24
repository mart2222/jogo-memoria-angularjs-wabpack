module.exports = Controller;

Controller.$inject = ["StorageService"];

function Controller(StorageService) {
  const vm = this;

  init();

  function init() {
    getRank();
    getTipo();
  }

  function getRank() {
    vm.ranking = StorageService.getRanking();
  }

  function getTipo() {
    vm.tipo = StorageService.getTipo();
  }

  vm.changeTipo = () => {
    StorageService.setTipo(vm.tipo);
    getRank();
  };
}

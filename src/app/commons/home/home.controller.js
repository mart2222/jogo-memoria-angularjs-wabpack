module.exports = Controller;

Controller.$inject = ["StorageService"];

function Controller(StorageService) {
  const vm = this;

  init();

  async function init() {
    vm.ranking = StorageService.getRanking();
  }
}

module.exports = Service;

const STORAGE = "projetoDB1";

Service.$inject = [];

function Service() {
  const self = this;

  let storage = getStorage();

  self.adicionaNovoRanking = (nome, tempo) => {
    storage.push({ nome, tempo });
    refreshStorage();
  };

  self.getRanking = () => {
    return storage.sort(ordenaTempoMenor).slice(0, 10);
  };

  function refreshStorage() {
    localStorage.setItem(STORAGE, JSON.stringify(storage));
  }

  function getStorage() {
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  }

  function ordenaTempoMenor(a, b) {
    return a.tempo > b.tempo ? 1 : -1;
  }
}

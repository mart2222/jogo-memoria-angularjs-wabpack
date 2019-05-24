module.exports = Service;

const RANKRODADA = "projetoDB1Rodada";
const RANKTEMPO = "projetoDB1Tempo";
const TIPO = "projetoDB1Tipo";

Service.$inject = [];

function Service() {
  const self = this;

  let rodadas = getStorageRodadas();
  let tempos = getStorageTempos();

  self.adicionaNovoRanking = (nome, value) => {
    if (isRodada()) {
      rodadas.push({ nome, value });
      return localStorage.setItem(RANKRODADA, JSON.stringify(rodadas));
    }
    tempos.push({ nome, value });
    return localStorage.setItem(RANKTEMPO, JSON.stringify(tempos));
  };

  self.getRanking = () => {
    if (isRodada()) return rodadas.sort(ordenaValueMenor).slice(0, 10);
    return tempos.sort(ordenaValueMenor).slice(0, 10);
  };

  function getStorageRodadas() {
    return JSON.parse(localStorage.getItem(RANKRODADA)) || [];
  }

  function getStorageTempos() {
    return JSON.parse(localStorage.getItem(RANKTEMPO)) || [];
  }

  function ordenaValueMenor(a, b) {
    return a.value > b.value ? 1 : -1;
  }

  function isRodada() {
    return self.getTipo() === "rodada";
  }

  self.setTipo = tipo => localStorage.setItem(TIPO, tipo);
  self.getTipo = tipo => localStorage.getItem(TIPO) || "rodada";
}

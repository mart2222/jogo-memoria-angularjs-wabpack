const angular = require("angular");

const NOVOJOGO = "NOVOJOGO";
const SELECAONOME = "SELECAONOME";
const JOGOCOMPLETADO = "JOGOCOMPLETADO";
const TOTALIMAGENS = 15;

module.exports = Controller;

Controller.$inject = ["$scope", "StorageService"];

function Controller($scope, StorageService) {
  const vm = this;

  const images = [];

  let selecionadas = [];
  let completadas = [];
  let totalCartas = null;
  let cronometro = true;

  //métodos externos
  vm.iniciarNovoJogo = iniciarNovoJogo;
  vm.selecionaCarta = selecionaCarta;
  vm.isRodada = isRodada;

  init();

  function init() {
    vm.NOVOJOGO = NOVOJOGO;
    vm.SELECAONOME = SELECAONOME;
    vm.JOGOCOMPLETADO = JOGOCOMPLETADO;
    vm.estado = vm.SELECAONOME;
    carregaImagens();
    getTipo();
  }

  function zeraVariaveis() {
    selecionadas = [];
    completadas = [];
    totalCartas = null;
    cronometro = true;
    vm.rodada = 0;
  }

  function getTipo() {
    vm.tipo = StorageService.getTipo();
  }

  function isRodada() {
    return vm.tipo === "rodada";
  }

  function carregaImagens() {
    for (let index = 1; index <= TOTALIMAGENS; index++) {
      images.push({
        id: index,
        image: require(`../../../assets/img/${index}.jpg`)
      });
    }
  }

  function selecionaCarta(carta, index) {
    if (selecionadas.length > 1 || carta.virada) return;
    carta.virada = true;
    carta.class = { "is-flipped": true };
    verificaCarta(index);
  }

  function verificaCarta(index) {
    if (!selecionadas.length) return selecionadas.push(index);
    selecionadas.push(index);

    if (isRodada()) vm.rodada++;

    if (!verificaCartaIgual()) return desviraCartasSelecionadas();
    return salvaCartasCertas();
  }

  function verificaCartaIgual() {
    return vm.cartas[selecionadas[0]].id === vm.cartas[selecionadas[1]].id;
  }

  function desviraCartasSelecionadas() {
    setTimeout(() => {
      selecionadas.forEach(index => {
        vm.cartas[index].class = { "is-flipped": false };
        vm.cartas[index].virada = false;
      });
      limpaSelecionadas();
      $scope.$apply();
    }, 1000);
  }

  function salvaCartasCertas() {
    completadas = completadas.concat(selecionadas);
    limpaSelecionadas();
    verificaSeAcertouTodos();
  }

  function limpaSelecionadas() {
    selecionadas = [];
  }

  function verificaSeAcertouTodos() {
    if (completadas.length !== totalCartas) return;

    pararCronometro();
    setTimeout(() => {
      mostraResultadoFinal();
      $scope.$apply();
    }, 1000);
  }

  function mostraResultadoFinal() {
    let value = isRodada() ? vm.rodada : vm.tempo;
    StorageService.adicionaNovoRanking(vm.nome, value);
    vm.estado = vm.JOGOCOMPLETADO;
  }

  function iniciarNovoJogo() {
    zeraVariaveis();
    vm.estado = NOVOJOGO;
    vm.cartas = angular
      .copy(images)
      .concat(angular.copy(images))
      .sort(misturaImagens);
    totalCartas = vm.cartas.length;

    if (!isRodada()) iniciaCronometro();

    function misturaImagens() {
      let a = Math.floor(Math.random() * 60);
      let b = Math.floor(Math.random() * 120);
      return a > b ? -1 : 1;
    }
  }

  function pararCronometro() {
    cronometro = false;
  }

  function iniciaCronometro() {
    cronometro = true;
    vm.tempo = 0;

    loopTempo();
    function loopTempo() {
      setTimeout(() => {
        vm.tempo++;
        $scope.$apply();
        if (cronometro) return loopTempo();
      }, 1000);
    }
  }
}

/*
MART
fazer um modo dificil on quando acertar os pares ele remover e colocar uma delas em uma lista de completadas e reordenar a grid
*/

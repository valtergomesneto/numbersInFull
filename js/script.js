window.addEventListener('load', start);

//VARIAVEIS GLOBAIS
var resulRealTime = null;
var Ext = null;
var extName = null;
var add = false;

//vetores
var numCent = [
  'cem',
  'cento',
  'duzentos',
  'trezentos',
  'quatrocentos',
  'quinhentos',
  'seiscentos',
  'setecentos',
  'oitocentos',
  'novecentos',
];
var numDez = [
  'vinte',
  'trinta',
  'quarenta',
  'ciquenta',
  'sessenta',
  'setenta',
  'oitenta',
  'noventa',
];
var numDezenasMenorQueVinte = [
  'dez',
  'onze',
  'doze',
  'treze',
  'quatorze',
  'quinze',
  'dezesseis',
  'dezessete',
  'dezoito',
  'dezenove',
];
var numUnidades = [
  'zero',
  'um',
  'dois',
  'três',
  'quatro',
  'cinco',
  'seis',
  'sete',
  'oito',
  'nove',
];
//FUNÇÃO START INICIALIZANDO TUDO AO CARREGAR A PÁGINA

function start() {
  loadRange();
  loadInputs();
}

function loadInputs() {
  var range = document.querySelector('#rangeId');
  var numero = range.value;
  if (numero != undefined) {
    FillInputs(numero);
  }
  resultadoTempoReal = document.querySelector('#numAtual');
  resultadoTempoReal.disabled = true;
  Extenso = document.querySelector('#numExt');
  Extenso.disabled = true;
}

function loadRange() {
  function changeNumbers(event) {
    var number = event.target.value;
    if ((number) => 0 && number <= 999) {
      FillInputs(number);
    }
  }

  var range = document.querySelector('#rangeId');

  range.addEventListener('change', changeNumbers);
}

function FillInputs(numero) {
  function VerifyHundredNumber(numero) {
    var Centena;
    var restoDeCem = Math.floor(numero / 100);
    if (restoDeCem > 0) {
      if (numero == 100) {
        Centena = numCent[0];
      } else {
        Centena = numCent[restoDeCem];
      }
    } else {
      Centena = '';
    }
    return Centena;
  }
  function VerifyDozensNumber(numero) {
    var nomeDezena;
    adicionaE = numero > 100;
    var ModuloDeCem = numero % 100;
    var restoDeDez = Math.floor(ModuloDeCem / 10);

    if (ModuloDeCem !== 0 && restoDeDez > 0) {
      if (restoDeDez === 1) {
        var moduloDeDez = ModuloDeCem % 10;
        nomeDezena = numDezenasMenorQueVinte[moduloDeDez];
      } else {
        nomeDezena = numDez[restoDeDez - 2];
      }
    } else {
      nomeDezena = '';
      adicionaE = false;
    }

    if (adicionaE) {
      nomeDezena = ' e ' + nomeDezena;
    }

    return nomeDezena;
  }
  function VerifyUnityNumber(numero) {
    var nomeUnidade;
    adicionaE = numero > 20;
    var ModuloDeCem = numero % 100;
    var moduloDeDez = ModuloDeCem % 10;

    var DezenaDiferentedaPrimeira = ModuloDeCem >= 20 || ModuloDeCem < 10;

    var dezenaSemUnidadeZero = moduloDeDez === 0 && DezenaDiferentedaPrimeira;

    if (DezenaDiferentedaPrimeira && (!dezenaSemUnidadeZero || numero == 0)) {
      nomeUnidade = numUnidades[moduloDeDez];
    } else {
      nomeUnidade = '';
      adicionaE = false;
    }

    if (adicionaE) {
      nomeUnidade = ' e ' + nomeUnidade;
    }

    return nomeUnidade;
  }

  nomePorExtenso = VerifyHundredNumber(numero);
  nomePorExtenso += VerifyDozensNumber(numero);
  nomePorExtenso += VerifyUnityNumber(numero);
  resultadoTempoReal = document.querySelector('#numAtual');
  resultadoTempoReal.value = numero;
  Extenso = document.querySelector('#numExt');
  Extenso.value = nomePorExtenso;
}

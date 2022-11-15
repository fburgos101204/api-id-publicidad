const http = require('http');
const axios = require('axios')
const cheerio = require('cheerio');
//const pg = require("./db.js");

const Scrapping = function(balance){};

// Nombres de las loterias
Scrapping.lotteryName = async (result) => {
  let url = 'https://loteriasdominicanas.com/'
  const { data } = await axios.get('https://loteriasdominicanas.com/')
  const $ = cheerio.load(data);
  const titulosLotery = [];

  let containerDiv = '.container > section > .row > .game-block > div .game-title'

  $(containerDiv).each((_idx, el) => {
    let titulo = $(el).text().trim()

    /*if (titulo != 'Juega + Pega +' 
    && titulo != 'Pega 3 Más' 
    && titulo != 'Loto Pool' 
    && titulo != 'Super Kino TV' 
    && titulo != 'Loto - Super Loto Más'
    && titulo != 'Mega Millions' 
    && titulo != 'Mega Chances' 
    && titulo != 'PowerBall' 
    && titulo != 'Cash 4 Life' 
    && titulo != 'Quiniela LoteDom' 
    && titulo != 'El Quemaito Mayor' 
    && titulo != 'King Lottery 12:30' 
    && titulo != 'King Lottery 7:30'
    ){*/
      let datos = {
        id: _idx,
        loteria: titulo,
      }
      titulosLotery.push(datos)
    //}
  });

 return titulosLotery
}

formatNumber = (textNumber) => {
  let text = textNumber.replace(/\D/g, "")
  let result = text.substr(0, 2);
  let result1 = text.substr(2, 2);
  let result2 = text.substr(4, 2);

  return result + ' - ' + result1 + ' - ' + result2;
}

formatNumberOne = (textNumber) => {
  let text = textNumber.replace(/\D/g, "")
  return text.substr(0, 2);
}

formatNumberTwo   = (textNumber) => {
  let text = textNumber.replace(/\D/g, "")
  return text.substr(2, 2);
}

formatNumberThreee   = (textNumber) => {
  let text = textNumber.replace(/\D/g, "")
  return text.substr(4, 2);
}

// numeros de las loterias
Scrapping.numeros = async (id, result) => {

  const { data } = await axios.get('https://loteriasdominicanas.com/')
  const $ = cheerio.load(data);
  const titulosLotery = [];

  let containerDiv = '.container > section > .row > .game-block > div .game-scores'

  $(containerDiv).each((_idx, el) => {
    let numero = $(el).text().trim()
    let numSend =  numero.split('\n').join(',');
    let numSendSecond = numSend.trim()

    if (_idx == id){

      let info = {
        numberOne: formatNumberOne(numSendSecond),
        numberTwo: formatNumberTwo(numSendSecond),
        numberThreee: formatNumberThreee(numSendSecond),
        todosNumeros:formatNumber(numSendSecond)
      }
      titulosLotery.push(info)
      //titulosLotery.push(formatNumber(numSendSecond))
    }
  });

 return titulosLotery[0]
}

// Fechas de las loterias
Scrapping.fechas = async (id, result) => {

  const { data } = await axios.get('https://loteriasdominicanas.com/')
  const $ = cheerio.load(data);
  const titulosLotery = [];

  let containerDiv = '.container > section > .row > .game-block > div .session-date'

  $(containerDiv).each((_idx, el) => {
    let fecha = $(el).text().trim()
    if (_idx == id){
      titulosLotery.push(fecha)
    }
  });

 return titulosLotery[0]
}



module.exports = Scrapping;
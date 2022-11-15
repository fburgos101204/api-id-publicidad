const Model = require('../models/model.js');
const Winners = require('../models/winnersModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const http = require('http');
const axios = require('axios')
const cheerio = require('cheerio');
let Utils = require('../helpers/utils');

//setTZ('America/Santo_Domingo')
process.env.TZ = "America/Santo_Domingo";

/*
@autor: Fernando Burgos

Url de la pagina: process.env.URL_LOTTERY
Titulo de loterias: '.container > section > .row > .game-block > div .game-title'
Lista de numeros: '.container > section > .row > .game-block > div .game-scores'
Fecha: '.container > section > .row > .game-block > div .session-date'
*/

jwtVerify = (token) =>{
  let obj = []
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: 'Your token is invalid or expired',
        Permission: "Permission denied.",
        error: true,
        date: new Date()
      });
    }
    let data = {
      id: decoded.id,
      name: decoded.name,
      password: decoded.password,
      phone: decoded.phone,
      date: decoded.fecha_hora,
      expiresIn: decoded.expiresIn
    }
    obj.push(data);
  });

  return obj
}

// Buscar todos los ganadores (Ready)
exports.findAll = (req, res) => {
  Winners.findAll((err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Log del Scrapping (Ready)
exports.logScrappingList = (req, res) => {
  Winners.logScrappingList((err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Buscar todos los ganadores por fecha (Ready)
exports.findAllByDate = (req, res) => {
  process.env.TZ = "America/Santo_Domingo";
  let hoy = new Date();
  let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1)  + '-' + hoy.getDate()

  Winners.findAllByDate(fecha, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Listado de ticket ganadores despues
// del proceso ejecutado
exports.ganadoresList = (req, res) => {

  let hoy = new Date();
  let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1)  + '-' + hoy.getDate()

  Winners.ganadoresList(fecha, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}


exports.findOne = (req, res) => {
  Winners.findOne(req.params.id,(err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}



exports.addWinners = (req, res) => {

  if (!req.body) {
    res.status(400).send({
     message: "Ta mal",
      error: true
    });
  }

  let hoy = new Date();
  let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
  let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let fecha_hora = fecha + ' ' + hora;

  const datos = new Winners({
    idLottery: req.body.idLottery,
    numberOne: req.body.numberOne,
    numberTwo: req.body.numberTwo,
    numberThreee: req.body.numberThreee, 
    date: fecha
  })
  
  let dataJwt = jwtVerify(req.headers.token)
  Winners.addWinners(datos,(err, data) => {
    if(err){
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    } else {
      Winners.updateLottery(datos,(err, dataOne) => {});
      res.send(data);
    } 
  });

}


formatCero = (number) => {
  let value;
  if(number == 0){
    value = '0'+number
  }else if(number < 10){
    value = '0'+number
  } else {
    value = number
  }
    return value
}


// Correr Scrapping
exports.getpage = async (req, res) => {

  try {

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var fechaDeHoy = `${formatCero(day)}-${month}-${year}`;
    var fechabdSave = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let fecha_hora = fechabdSave + ' ' + hora;

    // Limpiar tabla antes de ejecutar Scrapping
    var saveLog = await Winners.logScrapping(fechabdSave, hora, fecha_hora)
    var cleanTable = await Winners.cleanWinners(fechabdSave)

    var nombre = await Model.lotteryName()
    var numeros = await Model.numeros()
    var fechas = await Model.fechas()
    var dataSendObject = []
    //console.log(nombre)
    //       && fechaScra == fechaDeHoy
    // && item.loteria != 'Quiniela LoteDom' 

    for  (let item of nombre){
      let fechaScra = await Model.fechas(item.id)
      let numerosScra = await Model.numeros(item.id)

      if (item.loteria != 'Juega + Pega +' 
      && item.loteria != 'Pega 3 Más' 
      && item.loteria != 'Loto Pool' 
      && item.loteria != 'Super Kino TV' 
      && item.loteria != 'Loto - Super Loto Más'
      && item.loteria != 'Mega Millions' 
      && item.loteria != 'Mega Chances' 
      && item.loteria != 'PowerBall' 
      && item.loteria != 'Cash 4 Life' 
      && item.loteria != 'El Quemaito Mayor' 
      && item.loteria != 'King Lottery 12:30' 
      && item.loteria != 'King Lottery 7:30'
      && item.loteria != 'King Lottery 7:30'
      && fechaScra == fechaDeHoy
      ){

        let dataSend = {
          id: item.id,
          loteria: item.loteria,
          numeros: await Model.numeros(item.id),
          fecha: await Model.fechas(item.id),
          error: false
        }

        dataSendObject.push(dataSend)

        let datos = {
          idLottery: item.id,
          name: item.loteria.toUpperCase(),
          numberOne: numerosScra.numberOne,
          numberTwo: numerosScra.numberTwo,
          numberThreee: numerosScra.numberThreee, 
          date: fechabdSave
        }
        
        //console.log(datos)
        
        Winners.addWinners(datos,(err, data) => {});
      }
    }

    res.status(200).send(dataSendObject)

  } catch (error) {
    console.error(error)
  }
}
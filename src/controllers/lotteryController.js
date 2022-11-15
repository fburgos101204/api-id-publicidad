const Lottery = require('../models/lotteryModel.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setTZ = require('set-tz');
const secret = process.env.TOKEN_SECRET;
let Utils = require('../helpers/utils');

//setTZ('America/Santo_Domingo')
process.env.TZ = "America/Santo_Domingo";

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

// Buscar todas las loterias (Ready)
exports.findAll = (req, res) => {

  Lottery.findAll((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    } else {
      for (const d of data) {
        d.date_created = Utils.formatDateTime(d.date_created);
        d.closed_time = Utils.formatDateTime(d.closed_time);
        d.open_time = Utils.formatDateTime(d.open_time);
        d.dateWinners = Utils.formatDateTime(d.dateWinners);
      }
      
      res.send({lotteries: data, now: Utils.getDateTime()});
    }
  });
}

// Todas las loterias Abiertas (Ready)
exports.findAllOpen = (req, res) => {
  Lottery.findAllOpen((err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Buscar una loteria (Ready)
exports.findOne = (req, res) => {
  Lottery.findOne(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Desactivar lotiera (Ready)
exports.lotteryDisabled = (req, res) => {
  Lottery.lotteryDisabled(req.params.id, req.body.set, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Editar loteria (Ready)
exports.lotteryEdit = (req, res) => {

  if (!req.body) {
    res.status(400).send({
     message: "Ta mal",
      error: true
    });
  }

  const lottery = new Lottery({
    name : req.body.name,
    open_time : req.body.open_time,
    closed_time : req.body.closed_time
  });

  Lottery.lotteryEdit(req.params.id, lottery, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Eliminar loteria (Ready)
exports.remove = (req, res) => {
  Lottery.remove(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.status(200).send({
      message: "Loteria eliminada",
      data: new Date(),
      error: false
    });
  });
}

// Agregar loteria (Ready)
exports.addLottery = (req, res) => {

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

  const token = req.headers.token;
  let data = jwtVerify(token)

  let lottery = {
    name : req.body.name,
    date_created : fecha,
    open_time : req.body.open_time,
    closed_time : req.body.closed_time,
    logo : req.body.logo,
    active : true
  };
  
  console.log(lottery);
  Lottery.addLottery(lottery, (err, dataOne) => {
    if (err){
      res.status(500).send({
        message: err.message || "Error al crear loteria",
        error: true
      });
    } else {
      res.json({data: dataOne, date: fecha_hora, error: false});
    } 
  })
  
}

// Actulizar numeros ganadores (Ready)
exports.updateWinners = (req, res) => {

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

  const lottery = new Lottery({
    numberOne:  req.body.numberOne,
    numberTwo: req.body.numberTwo,
    numberThreee: req.body.numberThreee,
    dateWinners: fecha_hora
  });
  
  Lottery.updateWinners(lottery, req.params.id, (err, dataOne) => {
    if (err){
      res.status(500).send({
        message: err.message || "Error al guardar ganadores",
        error: true,
        date: new Date()
      });
    } else {
      res.json({data: dataOne, date: fecha_hora, error: false});
    }
  })
}

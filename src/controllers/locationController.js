const Location = require('../models/locationModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setTZ = require('set-tz');
const secret = process.env.TOKEN_SECRET;
let Utils = require('../helpers/utils');
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

// Todas las localidades (Ready)
exports.findAll = (req, res) => {
  Location.findAll((err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Crear localidad (Ready)
exports.createLocation = (req, res) => {

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

  const datos = {
    localidad: req.body.localidad,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    foto: '',
    representante: req.body.representante,
    estado: 1, 
    date: fecha
  }
  
  let dataJwt = jwtVerify(req.headers.token)
  Location.createLocation(datos,(err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    }
    res.send(data);
  });
}

// Editar localidad (Ready)
exports.updateLocation = (req, res) => {

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

  const datos = {
    localidad: req.body.localidad,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    foto: '',
    representante: req.body.representante,
    id: req.params.id
  }
  
  let dataJwt = jwtVerify(req.headers.token)
  Location.updateLocation(datos,(err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    }
    res.send(data);
  });
}

// Desactivar localidad  (Ready)
exports.disabledLocation = (req, res) => {
  //let data = jwtVerify(req.headers.token)
  Location.disabledLocation(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Activar localidad (Ready)
exports.enabledLocation = (req, res) => {
  //let data = jwtVerify(req.headers.token)
  Location.enabledLocation(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

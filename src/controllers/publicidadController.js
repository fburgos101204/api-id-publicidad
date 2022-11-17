const Publicidad = require('../models/publicidadModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setTZ = require('set-tz');
const secret = process.env.TOKEN_SECRET;
let Utils = require('../helpers/utils');
process.env.TZ = "America/Santo_Domingo";

jwtVerify = (token) => {
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

// Todas las publicidad (Ready)
exports.findAll = (req, res) => {
  Publicidad.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    else res.send(data);
  });
}

// Crear publicidad (Ready)
exports.createPublicidad = (req, res) => {

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
    foto: req.body.foto,
    id_localidad: req.body.id_localidad,
    fecha_creacion: fecha,
    fecha_vencimiento: req.body.fecha_vencimiento,
    fecha_inicio: req.body.fecha_inicio,
    usuario_created: req.body.usuario_created,
    loop: req.body.loop,
  }

  let dataJwt = jwtVerify(req.headers.token)
  Publicidad.createPublicidad(datos, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    }
    res.send(data);
  });
}

// Editar publicidad (Ready)
exports.updatePublicidad = (req, res) => {

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
    foto: req.body.foto,
    id_localidad: req.body.id_localidad,
    fecha_vencimiento: req.body.fecha_vencimiento,
    fecha_inicio: req.body.fecha_inicio,
    usuario_created: req.body.usuario_created,
    loop: req.body.loop,
    id: req.params.id
  }

  let dataJwt = jwtVerify(req.headers.token)
  Publicidad.updatePublicidad(datos, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    }
    res.send(data);
  });
}

// Desactivar Publicidad  (Ready)
exports.disabledPublicidad = (req, res) => {
  Publicidad.disabledPublicidad(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    else res.send(data);
  });
}

// Activar Publicidad (Ready)
exports.enabledPublicidad = (req, res) => {
  Publicidad.enabledPublicidad(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    else res.send(data);
  });
}

// eliminar Publicidad (Ready)
exports.deletePublicidad = (req, res) => {
  Publicidad.deletePublicity(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ta mal",
        error: true
      });
    else res.send(data);
  });
}

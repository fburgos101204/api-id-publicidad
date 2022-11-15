const pg = require("./db.js");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const Location = function(location){
  this.localidad = location.localidad;
  this.telefono = location.telefono;
  this.direccion = location.direccion;
  this.foto = location.foto;
  this.representante = location.representante;
  this.estado = location.estado;
  this.date = location.date;
};

let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;

// Todas las localidades (Ready)
Location.findAll = (result) => {
  pg.query(`SELECT * FROM localidades`,(err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == ""  || res.length == 0){
        result(null);
        return;
    } else {
        result(null, res);
        return;
    }
  });
}

// Crear usuario en el manager
Location.createLocation = (users, result) => {
  pg.query(`INSERT INTO localidades (localidad, direccion, telefono,  foto, representante)
  VALUES ('${users.localidad}', '${users.direccion}', '${users.telefono}', '${users.foto}', '${users.representante}')`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    console.log({id: res.insertId, users});
    result(null, {id: res.insertId, users, error: false});
  });
}

// Editar localidad (Ready)
Location.updateLocation = (users, result) => {
  pg.query(`UPDATE localidades
  SET localidad = '${users.localidad}', 
  direccion = '${users.direccion}', 
  telefono = '${users.telefono}', 
  foto = '${users.foto}', 
  representante = '${users.representante}'
  WHERE id = ${users.id}`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    console.log({users});
    result(null, {users, error: false, date: new Date()});
  });
}

// Desactivar localidad  (Ready)
Location.disabledLocation = (id, result) => {
  pg.query(`UPDATE localidades SET estado = 2 WHERE id = '${id}'`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, {message: 'Localidad desactivada', data: res, error: false, value: 1, date: new Date()});
  });
}

// Activar localidad (Ready)
Location.enabledLocation = (id, result) => {
  pg.query(`UPDATE localidades SET estado = 1 WHERE id = '${id}'`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, {message: 'Localidad activada', data: res, error: false, value: 1, date: new Date()});
  });
}

module.exports = Location;
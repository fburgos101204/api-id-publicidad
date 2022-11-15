const pg = require("./db.js");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const User = function(user){
  this.nombre = user.nombre;
  this.apellido = user.apellido;
  this.username = user.username;
  this.correo = user.correo;
  this.password = user.password;
  this.estado = user.estado;
  this.fecha_creacion = user.fecha_creacion;
  this.token = user.token;
  this.status = user.status;
};

let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;


// Crear usuario en el manager
User.createManager = (users, hash, result) => {
  pg.query(`INSERT INTO usuarios(nombre, apellido, username,  password, correo, fecha_creacion, status)
  VALUES ('${users.nombre}', '${users.apellido}', '${users.username}', '${hash}', '${users.correo}',' ${users.fecha_creacion}', true)`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    console.log({id: res.insertId, users});
    result(null, {id: res.insertId, users, error: false});
  });
}

// Buscar todos los usuarios
User.findAll = (result) => {
  pg.query(`SELECT * FROM usuarios`,(err, res) => {
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

// Buscar un usuario por Id
User.findOne = (id, result) => {
  pg.query(`SELECT * FROM usuarios 
    WHERE id = ${id}`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res == "[]" || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res);
        return;
    }
  });
}

// Buscar usuario By Correo Electronico
User.findOneByEmail = (correo, result) => {
  pg.query(`SELECT * FROM usuarios 
    WHERE correo = '${correo}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == "" || res.length == 0){
      result(null);
      return;
    } else {
      result(null, res);
      return;
    }
  });
}

// Desactivar un usuario
User.disabledUser = (id, result) => {
  pg.query(`UPDATE usuarios SET estado = 2 WHERE id = '${id}'`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, {message: 'Usuario desactivado', data: res, error: false, value: 1, date: new Date()});
  });
}

// Activar un usuario
User.activeUser = (id, result) => {
  pg.query(`UPDATE usuarios SET estado = 1 WHERE id = '${id}'`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, {message: 'Usuario activado', data: res, error: false, value: 1, date: new Date()});
  });
}

// Editar un usuario
User.editUser = (users, id, result) => {
  pg.query(`UPDATE usuarios
  SET nombre = '${users.nombre}', 
  apellido = '${users.apellido}', 
  username = '${users.username}', 
  correo = '${users.correo}', 
  WHERE id = ${id}`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    console.log({id: id, users});
    result(null, {id: id, users, error: false});
  });
}

// Eliminar usuario
User.remove = (id, result) => {
  pg.query(`DELETE FROM usuarios WHERE id = ${id}`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == "" || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res.rows);
        return;
    }
  })
}

// Guardar la ultima conexion del usuario
User.updateLastConnection = (id, result) => {

let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;

  pg.query(`INSERT INTO login_log (id_usuario, fecha, hora) 
  VALUES (${id}, '${fecha}', '${hora}')`)

  pg.query(`UPDATE usuarios SET ultima_conexion='${fecha_hora}'
  WHERE id = ${id}`, (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
  });
}

// Editar usuarios del manager
User.editUserManager = (users, id, result) => {
  pg.query(`UPDATE usuarios
  SET nombre = '${users.nombre}', 
  apellido = '${users.apellido}', 
  username = '${users.username}', 
  correo = '${users.correo}'
  WHERE id = ${id}`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    result(null, {id: id, users, data: res, error: false, date: new Date()});
  });
}

// Editar usuario
User.editUserPass = (password, id, result) => {
  pg.query(`UPDATE usuarios SET password = '${password}' WHERE id = ${id}`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    result(null, {id: id, data: res, error: false, date: new Date()});
  });
}

// Eliminar usuarios del manager
User.deleteUserManager = (id, result) => {
  pg.query(`DELETE FROM usuarios WHERE id = ${id}`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == "" || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res);
        return;
    }
  })
}

module.exports = User;
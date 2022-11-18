const pg = require("./db.js");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const Publicidad = function (publicidad) {
  this.foto = publicidad.foto;
  this.id_localidad = publicidad.id_localidad;
  this.fecha_creacion = publicidad.fecha_creacion;
  this.fecha_inicio = publicidad.fecha_inicio;
  this.fecha_vencimiento = publicidad.fecha_vencimiento;
  this.estado = publicidad.estado;
  this.usuario_created = publicidad.usuario_created;
  this.loop = publicidad.loop;
};

let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;

// Todas la publicidad (Ready)
Publicidad.findAll = (result) => {
  pg.query(`SELECT * FROM publicidad`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.rows == "[]" || res.rows == "" || res.length == 0) {
      result(null);
      return;
    } else {
      result(null, res);
      return;
    }
  });
}

// Crear Publicidad (Ready)
Publicidad.createPublicidad = (pb, result) => {
  pg.query(`INSERT INTO publicidad (foto, id_localidad, fecha_creacion, fecha_inicio, fecha_vencimiento, loope, usuario_created)
  VALUES ('${pb.foto}', '${pb.id_localidad}', '${pb.fecha_creacion}', '${pb.fecha_inicio}', '${pb.fecha_vencimiento}', ${pb.loop}, '${pb.usuario_created}')`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log({ id: res.insertId, pb });
    result(null, { id: res.insertId, pb, error: false, date: new Date() });
  });
}


// Editar Publicidad (Ready)
Publicidad.updatePublicidad = (pb, result) => {
  pg.query(` UPDATE publicidad SET foto = '${pb.foto}' , id_localidad = '${pb.id_localidad}' , 
  fecha_inicio = '${pb.fecha_inicio}' , fecha_vencimiento = '${pb.fecha_vencimiento}', 
  loope = ${pb.loop} WHERE id = ${pb.id} ;`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log({ pb });
    result(null, { pb, error: false, date: new Date() });
  });
}

git config user.name "fburgos101204"
git config user.email "fernando@virtualdoc.com.do"

// Desactivar Publicidad  (Ready)
Publicidad.disabledPublicidad = (id, result) => {
  pg.query(`UPDATE publicidad SET estado = 2 WHERE id = '${id}'`, (err, res, rows) => {
    if (err) {
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, { message: 'Publicidad desactivada', data: res, error: false, value: 1, date: new Date() });
  });
}

// Activar Publicidad (Ready)
Publicidad.enabledPublicidad = (id, result) => {
  pg.query(`UPDATE publicidad SET estado = 1 WHERE id = '${id}'`, (err, res, rows) => {
    if (err) {
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, { message: 'Publicidad activada', data: res, error: false, value: 1, date: new Date() });
  });
}

// Desactivar Publicidad  (Ready)
Publicidad.deletePublicity = (id, result) => {
  pg.query(`DELETE from publicidad WHERE id = '${id}'`, (err, res, rows) => {
    if (err) {
      console.log('error: ', err);
      resolve(err, null);
      return;
    }
    result(null, { message: 'Publicidad eliminada', data: res, error: false, value: 1, date: new Date() });
  });
}

module.exports = Publicidad;
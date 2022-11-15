const pg = require("./db.js");
const nodemailer = require('nodemailer');

const Lottery = function(lottery){
  this.name = lottery.name;
  this.date_created = lottery.date_created;
  this.open_time = lottery.open_time;
  this.closed_time = lottery.closed_time;
  this.logo = lottery.logo;
  this.active = lottery.active;
  this.numberOne = lottery.numberOne;
  this.numberTwo = lottery.numberTwo;
  this.numberThreee = lottery.numberThreee;
  this.dateWinners = lottery.dateWinners;
};


let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;


// Todas las loterias (Ready)
Lottery.findAll = (result) => {

  let date = new Date();
  let esta = date.toLocaleString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
  })

  pg.query(`SELECT * FROM lottery`,(err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == ""  || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res);
        return;
    }
  });
}

// Todas las loterias abiertas (Ready)
Lottery.findAllOpen = (result) => {
  pg.query(`SELECT * FROM lottery WHERE status = 1`,(err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == ""  || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res);
        return;
    }
  });
}

// Buscar una loteria (Ready)
Lottery.findOne = (id, result) => {
  pg.query(`SELECT * FROM lottery
  WHERE id = ${id}`,(err, res) => {
    console.log(res)
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == ""  || res.length == 0){
        result(null,{data: {}});
        return;
    } else {
        result(null, res);
        return;
    }
  });
}

// Eliminar loteria (Ready)
Lottery.remove = (id, result) => {
  pg.query(`DELETE FROM lottery WHERE id = ${id}`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.rows == "[]" || res.rows == "" || res.length == 0){
        result(null);
        return;
    } else {
        result(null, res.rows);
        return;
    }
  })
}

// Agregar loteria (Ready)
Lottery.addLottery = (lottery, result) => {
  pg.query(`INSERT INTO lottery(name, date_created, open_time, closed_time, active, logo)
  VALUES ('${lottery.name}','${lottery.date_created}', '${lottery.open_time}', '${lottery.closed_time}', ${lottery.active}, '${lottery.logo}')`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    result(null, {lottery, error: false, date: new Date()});
  });
}

// Actulizar numeros ganadores (Ready)
Lottery.updateWinners = (lottery, id, result) => {
  pg.query(`UPDATE lottery SET numberOne = ${lottery.numberOne}, numberTwo = ${lottery.numberTwo}, numberThreee = ${lottery.numberThreee}, dateWinners = '${lottery.dateWinners}'
  WHERE id = ${id}`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, {message: 'Numero ganadores actualizados', data: res, error: false, value: 1, date: new Date()});
  });
}

// Desactivar y activar loteria (Ready)
Lottery.lotteryDisabled = (id, set, result) => {
  pg.query(`UPDATE lottery SET active = ${set} WHERE id = ${id}`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, {message: 'Loteria actualizada', data: res, error: false, value: 1, date: new Date()});
  });
}

// Editar Loteria (Ready)
Lottery.lotteryEdit = (id, lottery, result) => {
  pg.query(`UPDATE lottery SET name = '${lottery.name}', 
  open_time = ${lottery.open_time}, closed_time = ${lottery.closed_time}
  WHERE id = ${id}`, (err, res, rows) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, {message: 'Loteria actualizada', data: res, error: false, value: 1, date: new Date()});
  });
}

module.exports = Lottery;
const pg = require("./db.js");
const nodemailer = require('nodemailer');

process.env.TZ = "America/Santo_Domingo";
const Winners = function(winners){
  this.idLottery = winners.idLottery;
  this.numberOne = winners.numberOne;
  this.numberTwo = winners.numberTwo;
  this.numberThreee = winners.numberThreee;
  this.date = winners.date;
};

process.env.TZ = "America/Santo_Domingo";
let hoy = new Date();
let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
let fecha_hora = fecha + ' ' + hora;

// Buscar todos los ganadores (Ready)
Winners.findAll = (result) => {
  pg.query(`SELECT MAX(w.date) AS DATE, l.logo, l.name, w.numberOne, w.numberTwo, w.numberThreee, l.closed_time, l.open_time
FROM winners w
INNER JOIN lottery l ON l.name = w.name
GROUP BY l.id`,(err, res) => {
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

// Log del Scrapping  (Ready)
Winners.logScrappingList = (result) => {
  pg.query(`SELECT * FROM scrapping_log ORDER BY id DESC LIMIT 1`,(err, res) => {
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

// Buscar todos los ganadores (Ready)
Winners.findAllByDate = (fecha, result) => {
  process.env.TZ = "America/Santo_Domingo";
  pg.query(`SELECT MAX(w.date) AS DATE, l.logo, l.name, w.numberOne, w.numberTwo, w.numberThreee, l.closed_time, l.open_time
  FROM winners w
  INNER JOIN lottery l ON l.name = w.name
  WHERE DATE = '${fecha}'
  GROUP BY w.id`,(err, res) => {
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

Winners.ganadoresList = (fecha, result) => {
  pg.query(`SELECT p."ticketNumber", tp."description", p."numberOne", p."numberTwo", p."numberThreee", ws."lottery_name",
  p."amountGanado", p."dateCreated"
  FROM "winners_summary" ws
  INNER JOIN plays p ON p.id = ws.play_id
  INNER JOIN "typePlays" tp ON tp.id = p."typePlays"
  WHERE ws.date::date = '${fecha}'
  GROUP BY p."ticketNumber", tp."description", p."numberOne", p."numberTwo", p."numberThreee", ws."lottery_name",
  p."amountGanado", p."dateCreated"`,(err, res) => {
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
        result(null, res.rows);
        return;
    }
  });
}

// Buscar un numero ganador (Ready)
Winners.findOne = (id, result) => {
  pg.query(`SELECT MAX(w.date) AS DATE, l.logo, l.name, w.numberOne, w.numberTwo, w.numberThreee, l.closed_time, l.open_time
  FROM winners w
  WHERE w.id = ${id}
  INNER JOIN lottery l ON l.id = w.idLottery
  GROUP BY l.id`,(err, res) => {
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
        result(null, res.rows);
        return;
    }
  });
}

// Agregar numeros ganadores (Ready)
Winners.addWinners = (datos, result) => {

  pg.query(`UPDATE lottery SET numberOne = ${datos.numberOne}, numberTwo = ${datos.numberTwo}, numberThreee = ${datos.numberThreee}, dateWinners = '${datos.date}'
  WHERE name = '${datos.name}'`)
  
  pg.query(`INSERT INTO winners(idLottery, numberOne, numberTwo, numberThreee, date, name)
  VALUES (${datos.idLottery}, ${datos.numberOne}, ${datos.numberTwo}, ${datos.numberThreee}, '${datos.date}', '${datos.name}');`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    result(null, {id: res.insertId, datos, error: false});
  });
}

// Limpiar tabla de ganadores por fecha (Ready)
Winners.cleanWinners = (fecha, result) => {
  pg.query(`DELETE FROM winners WHERE date = '${fecha}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  })
}

// Guardar Log Scrapping (Ready)
Winners.logScrapping = async (fechabdSave, hora, fecha_hora, result) => {
  pg.query(`INSERT INTO scrapping_log (dateRun, dateTimeRun, timeRun) 
  VALUES ('${fechabdSave}','${fecha_hora}','${hora}')`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  })
}


// Editar loteria
Winners.updateLottery = (datos, result) => {
  pg.query(`UPDATE lottery SET "numberOne" = ${datos.numberOne}, "numberTwo" = ${datos.numberTwo}, "numberThreee" = ${datos.numberThreee}, "dateWinners" = '${datos.date}'
  WHERE id = ${datos.idLottery}`, (err, res) => {
    if(err){
        console.log('error: ', err);
        result(err, null);
        return;
    }
    console.log({datos});
    result(null, {datos, error: false});
  });
}



module.exports = Winners;
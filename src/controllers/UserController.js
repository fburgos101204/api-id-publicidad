const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
let Utils = require('../helpers/utils');

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
      phone: decoded.phone,
      password: decoded.password,
      date: decoded.date,
      expiresIn: decoded.expiresIn
    }
    obj.push(data);
  });

  return obj
}

// Todos los users (Ready)
exports.findAll = (req, res) => {
  User.findAll((err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Crear users (Ready)
exports.createUserManager = (req, res) => {
  if (!req.body) {
    res.status(400).send({
     message: "Ta mal",
      error: true
    });
  }
  
  let pass = req.body.password.toString()
  
  let hoy = new Date();
  let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
  let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  let fecha_hora = fecha + ' ' + hora;

  const users = new User({
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    username : req.body.username,
    password : pass,
    correo : req.body.correo,
    fecha_creacion : fecha_hora,
    status : true
  });

  // Verificar si existe.
  //console.log(req.body)
  User.findOneByEmail(req.body.correo, (err, data) => {
    console.log(data);
    if(data == 0 || data == undefined){
      bcrypt.hash(pass, 10)
      .then((hash) => {
        User.createManager(users, hash, (err, dataOne) => {
          if (err){
            res.status(500).send({
              message: err.message || "Error al crear usuario",
              error: true
            });
          } else {
            res.json({
              data: dataOne, 
              date: fecha_hora, 
              error: false,  
              message: `Usuario registrado con exito`
            });
          } 
        })
      }).catch((e) => {
        console.log(e);
      });
    } else {
      res.send({ message: `Ya este usuario existe`, error: true, value: 1 });
    }
  })
}

// Login para usuarios del manager (Ready)
exports.loginManager = (req, res) => {
  console.log('Login Manager');

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

  User.findOneByEmail(req.body.email, (err, data) => {
    if(data == 0 || data == undefined){
      res.send({ message: `Este usuario no existe`, error: true, value: 1, date: new Date()});
    } else {
      console.log(data[0]);
      bcrypt.compare(req.body.password, data[0].password,(err, des) => {
        if (des) {
         const payload = {
           id: data[0].id,
           email: data[0].correo,
           name: data[0].nombre.trim()+' '+data[0].apellido.trim(),
           password: data[0].password,
           date: fecha_hora,
           expiresIn: '8h'
         };
         console.log(payload)
         const token = jwt.sign(payload, secret, {
           expiresIn: "8h",
         });

         const updateLastConnection = User.updateLastConnection(data[0].id)
         res.json({token: token, data: data[0], date: fecha_hora, expiresIn: '8h'});

        } else {
          res.status(400).send({
            message: "Error al crear el token",
            error: true,
            date: fecha_hora
          });
        }
      })
    }
  })
}

// Buscar usuario por Id (Ready)
exports.findOne = (req, res) => {
  let data = jwtVerify(req.headers.token)
  console.log('Get User findOne()')
  console.log(data)
  console.log(req.headers.token)
  User.findOne(data[0].id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true 
    });
    else res.send(data);
  });
}

// Desactivar usuario (Ready)
exports.disabledUser = (req, res) => {
  //let data = jwtVerify(req.headers.token)
  User.disabledUser(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Activar usuario (Ready)
exports.activeUser = (req, res) => {
  //let data = jwtVerify(req.headers.token)
  User.activeUser(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message: err.message || "Ta mal",
      error: true
    });
    else res.send(data);
  });
}


// Actulizar contraseña (Ready)
exports.updatePass = (req, res) => {

  if (!req.body) {
    res.status(400).send({
     message: "Ta mal",
      error: true
    });
  }
  
  User.findOneByEmail(req.body.correo, (err, data) => {
    if(data != 0 || data != undefined) {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        User.editUserPass(hash, data[0].id, (err, dataOne) => {
          if (err){
            res.status(500).send({
              message: err.message || "Error al editar la contraseña de este usuario",
              error: true,
              date: new Date()
            });
          } else {
            res.json(dataOne)
          }
        })
      }).catch((e) => {
        res.status(500).send({
          message: e || "Error al editareditar la contraseña de este usuario",
          error: true,
          date: new Date()
        });
      });
    } else {
      res.send({ 
        message: `Este usuario no existe en nuestros registros`, 
        error: true, 
        value: 1, 
        date: new Date() 
      });
    }
  })
}

// Cerrar Session (Ready)
exports.logout = (req, res) => {
  const token = req.headers.token;
   jwt.destroy(token)
   res.status(200).send({
     message: "Session destruida",
     error: false,
   })
}

// Eliminar usuarios (Ready)
exports.remove = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if(err)
    res.status(500).send({
      message:  "Ta mal",
      error: true
    });
    else res.send(data);
  });
}

// Editar usuario del manager
exports.editUserManager = (req, res) => {

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

  const usersEditManager = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    username : req.body.username,
    correo : req.body.correo
  };
  User.findOneByEmail(req.body.correo, (err, data) => {
    if(data != undefined) {
      User.editUserManager(usersEditManager, data[0].id, (err, dataOne) => {
        if (err){
          res.status(500).send({
            message: err.message || "Error al editar este usuario",
            error: true
          });
        } else {
          res.json(dataOne)
        }
      })

    } else {
      res.send({ 
        message: `Este usuario no existe en nuestros registros`, 
        error: true, 
        value: 1, 
        date: new Date() 
      });
   }
  })
}


// Eliminar usuarios del manager (Ready)
exports.deleteUserManager = (req, res) => {
  let dataJwt = jwtVerify(req.headers.token)
  User.deleteUserManager(req.params.id, (err, data) => {
    if(err){
      res.status(500).send({
        message:  "Ta mal",
        error: true
      });
    } else {
      res.status(200).send({
        message:  "Usuario eliminar con exito",
        error: false,
        data: data,
        date: new Date()
      });
    }
  });
}
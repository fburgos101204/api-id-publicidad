const jwt = require('jsonwebtoken');
const config = require(process.env.TOKEN_SECRET);
const User = require('../models/userModel.js');
const express = require('express');
const ruta = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const config = process.env.TOKEN_SECRET;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: 'No token'
        });
    }

    jwt.verify(token, config, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: 'no autorizado'
            });
        }
        req.userid = decoded.id;
        next();
    });
};

const authJWT = verifyToken;

exports.signup = (req, res) => {
var hashPass = bcrypt.hashSync(req.body.password, 8);
    User.create({
        username: req.body.username,
        password: hashPass,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    },
    function (err, user){
        if(err) return res.status(500).send('hubo un problema registrando el usuario');
        //crear el token
        var token = jwt.sign({id: user._id}, config, {
            expiresIn: 86400 //expira en 24 horas
        });
        res.status(200).send({auth: true, token: token});
    });
}

exports.obtenerToken = (req, res) => {
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth: false, message: 'No hay token'});

    jwt.verify(token, config, function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'autenticacion de token fallida'});
        res.status(200).send(decoded);
        console.log(decoded);

        User.findById(decoded.id, function (err, user) {
            if(err) return res.status(500).send('Hubo un problema');
            if(!user) return res.status(404).send('No hay usuario');

            res.status(200).send(user);
        });
    });
}

exports.login = (req, res) => {
    var emaile = req.body.email;
    var pass = req.body.pass;
    console.log(emaile);
    console.log(pass);
    User.login({emaile}, function(err, user) {
        if(err) return res.status(500).send('error en el servidor');
        if(!user) return res.status(404).send('no usuario encontrado');

        var passIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passIsValid) return res.status(401).send({auth: false, token: null});

        var token = jwt.sign({id: user._id}, config, {
            expiresIn: 86400 //expira en 24 horas un dia dos medios dias
        });
        res.status(200).send({auth: true, token: token});
    });
}

module.exports = authJWT;
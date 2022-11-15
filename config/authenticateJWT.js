const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
require('dotenv').config();

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          msg: 'Your token is invalid or expired',
          Permission: "Permission denied.",
          error: true,
          date: new Date()
        });
      }
      console.log(decoded.exp);
      next();
    });
  }
}
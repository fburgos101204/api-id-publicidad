const express = require("express");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const setTZ = require('set-tz'); // Set hora del server
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Client = require('ssh2-sftp-client');
let sftp = new Client();

require('dotenv').config();
const app = express();
const { getDateTime } = require("./src/helpers/utils.js");


//setTZ('America/Santo_Domingo')
process.env.TZ = "America/Santo_Domingo";

var corsOptions = {
  origin: [
  'http://localhost:3045', 
  'http://110.238.82.96:60234', 
  'http://localhost:60234', 
  'http://192.168.100.184:60234',
  'http://localhost:4200',
  'https://ewallet.fvtech.net:60234',
  'https://ewallet.fvtech.net:4200'
  ]
};


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    createParentPath: true
}));

/*
app.use(basicAuth( {
  authorizer: myAuthorizer,
  unauthorizedResponse: getUnauthorizedResponse
} ))

function myAuthorizer(username, password) {
 const userMatches = basicAuth.safeCompare(username, process.env.UserNameAuth)
 const passwordMatches = basicAuth.safeCompare(password, process.env.PasswordAuth)

 return userMatches & passwordMatches
}

function getUnauthorizedResponse(req) {
 return req.auth
  ? ('Credentials rejected')
  : 'No credentials provided'
}
*/

require("./src/rutas/userRuta.js")(app);
require("./src/rutas/lotteryRoute.js")(app);
require("./src/rutas/winnersRoute.js")(app);
require("./src/rutas/locationRoute.js")(app);
require("./src/rutas/publicidadRoute.js")(app);

app.listen(process.env.PORT || 3045, () => {
  console.log('Hora Server: '+ new Date())
  console.log("Server is running on port 3045");
});

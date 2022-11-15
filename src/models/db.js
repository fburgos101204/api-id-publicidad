const pg = require('mysql');

const connection = pg.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERS,
    password:  process.env.PASS,
    database: process.env.DATABASE,
    dialect: 'mysql',
    port: '3306'
});

connection.connect(error => {
    if(error) throw error;
    console.log("DB connected!");
})

module.exports = connection;

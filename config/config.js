//Produccion
module.exports = {
    HOST: "locahost",
    USER: "root",
    PASSWORD: "",
    DB: "id_publicidad",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    } 
};
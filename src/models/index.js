// <<<<<<< HEAD
// const { Sequelize, DataTypes } = require('sequelize')
// const User = require('./UserModel')
// const Image = require('./ImageModel')
// const Directions = require('./DirectionsModel')
// const FamilyProfile = require('./FamilyProfilesModel')
// const Prescription = require('./PrescriptionModel')
// const Pharmacys = require('./PharmacysModel')
// const Products = require('./ProductsModel')
// const Category = require('./CategoryModel')

// // GeomFromText MySql bug workaround
// const wkx = require('wkx')
// Sequelize.GEOMETRY.prototype._stringify = function _stringify (value, options) {
//   return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`
// }
// Sequelize.GEOMETRY.prototype._bindParam = function _bindParam (value, options) {
//   return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`
// }
// Sequelize.GEOGRAPHY.prototype._stringify = function _stringify (value, options) {
//   return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`
// }
// Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam (value, options) {
//   return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`
// }
// // End workaround

// // Initialize database connection
// const sequelize = new Sequelize({
//   database: process.env.DATABASE,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT,
//   port: process.env.DB_PORT,
//   /*
//     anytime you need external connection such as
//     databases or smtp servers in AWS Lambda (serverless)
//     use pooled connections to avoid creating and destroying
//     connections repeatedly. This WILL cause timeouts
//     and 502 or 500 errors for your clients
//   */
//   pool: {
//     min: 0,
//     max: 5,
//     idle: 1000
//   },
//   define: {
//     charset: 'utf8'
//   },
//   dialectOptions: {
//     connectTimeout: 60000 // a full minute of timeout for cold starts
//   }
// })

// // Initialize data models
// /*
//   This does NOT create the tables in the database
//   only the data models. To create the tables, call
//   "sequelize.sync()"
// */
// const models = {
//   User: User(sequelize, DataTypes),
//   Image: Image(sequelize, DataTypes),
//   Directions: Directions(sequelize, DataTypes),
//   FamilyProfile: FamilyProfile(sequelize, DataTypes),
//   Prescription: Prescription(sequelize, DataTypes),
//   Pharmacys: Pharmacys(sequelize, DataTypes),
//   Products: Products(sequelize, DataTypes),
//   Category: Category(sequelize, DataTypes)
// }

// // Create relationships between data models
// /*
//   Many of these create extra columns for foreign keys
//   so they are not required to be defined in the
//   data model alone
// */
// const associateModels = (models) => {
//   User.Image = models.User.hasMany(models.Image, { foreignKey: { name: 'user_id', allowNull: false, unique: 'image_user_fam_type' } })
//   Image.User = models.Image.belongsTo(models.User, { foreignKey: { name: 'user_id', allowNull: false, unique: 'image_user_fam_type' } })

//   User.Directions = models.User.hasMany(models.Directions, { foreignKey: { name: 'user_id', allowNull: false } })
//   Directions.User = models.Directions.belongsTo(models.User, { foreignKey: { name: 'user_id', allowNull: false } })

//   User.FamilyProfile = models.User.hasMany(models.FamilyProfile, { foreignKey: { name: 'user_id', allowNull: false } })
//   FamilyProfile.User = models.FamilyProfile.belongsTo(models.User, { foreignKey: { name: 'user_id', allowNull: false } })

//   FamilyProfile.Image = models.FamilyProfile.hasMany(
//     models.Image,
//     {
//       foreignKey: {
//         name: 'fam_id',
//         // allow null, because images may exist without FamilyProfile, but not without User
//         allowNull: true,
//         // this foreign key belongs to this unique constraint
//         unique: 'image_user_fam_type'
//       },
//       onDelete: 'CASCADE',
//       // ensure that this association participates in hooks
//       hooks: true
//     })
//   Image.FamilyProfile = models.Image.belongsTo(
//     models.FamilyProfile,
//     {
//       foreignKey: {
//         name: 'fam_id',
//         allowNull: true,
//         unique: 'image_user_fam_type'
//       },
//       onDelete: 'CASCADE'
//     })

//   User.Prescription = models.User.hasMany(models.Prescription, { foreignKey: { name: 'user_id', allowNull: false } })
//   Prescription.User = models.Prescription.belongsTo(models.User, { foreignKey: { name: 'user_id', allowNull: false } })

//   Prescription.FamilyProfile = models.Prescription.belongsTo(models.FamilyProfile, { foreignKey: { name: 'fam_id', allowNull: false } })
//   FamilyProfile.Prescription = models.FamilyProfile.hasMany(models.Prescription, { foreignKey: { name: 'fam_id', allowNull: false } })

//   Prescription.Image = models.Prescription.hasOne(models.Image, { foreignKey: { name: 'prescript_id', allowNull: true } })
//   Image.Prescription = models.Image.belongsTo(models.Prescription, { foreignKey: { name: 'prescript_id', allowNull: true } })

//   Pharmacys.Products = models.Pharmacys.hasMany(models.Products, { foreignKey: { name: 'idPharmacys', allowNull: false } })
//   Products.Pharmacys = models.Products.belongsTo(models.Pharmacys, { foreignKey: { name: 'idPharmacys', allowNull: false } })

//   Category.Products = models.Category.hasMany(models.Products, { foreignKey: { name: 'idCategory', allowNull: false } })
//   Products.Category = models.Products.belongsTo(models.Category, { foreignKey: { name: 'idCategory', allowNull: false } })
// }

// associateModels(models)

// // util to check if db connection successful
// const checkConnection = async (sequelize) => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }
// =======
// const config = require('./db.js');
// const { Sequelize } = require('sequelize');

// const Sequelize = new Sequelize(
//     config.database, 
//     config.user,
//     config.password,
//     {
//         host: config.host,
//         dialect: config.dialect,
//         operatorAliases: false,

//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );
// >>>>>>> 45ba5e165e6339f0cf700670064c443750e2cb10


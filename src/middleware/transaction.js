const Sequelize = require('sequelize')
const cls = require('cls-hooked')

let namespace

/*
  ensures that database operations only commit if
  http status code is not an error code (4xx - 5xx),
  otherwise, cause a rollback on all operations caused
  by the request
*/
exports.Transaction = ({ sequelize }) => {
  if (!sequelize || !(sequelize instanceof Sequelize)) {
    throw new Error('must be passed an instance of Sequelize')
  }

  // create namespace for requests and assign it to Sequelize
  if (!Sequelize.cls) {
    namespace = cls.createNamespace('express-sequelize-transaction')
    Sequelize.useCLS(namespace)
  } else {
    namespace = Sequelize.cls
  }

  // check if namespace is correctly setup
  // sequelize.transaction((t1) => {
  //   console.log(namespace.get('transaction') === t1)
  // })

  return (req, res, next) => {
    // create a transaction and call next middleware
    sequelize.transaction(async t => {
      next()
      // once all middleware finish, verify status code
      await new Promise((resolve, reject) => {
        res.on('finish', () => {
          // if any errors occur, rollback the transaction
          if (res.statusCode > 400) {
            // rollback
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          } else {
            // commit
            resolve()
          }
        })
      })
    // if middlewares finish with an error, pass it along
    }).catch(next)
  }
}

exports.namespace = namespace

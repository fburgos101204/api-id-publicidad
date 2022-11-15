const crypto = require('crypto')

// this module is simply to generate cryptographically safe
// random numbers. This should probably be a module of regular
// functions instead of express middleware to allow modularity
module.exports = (req, res, next) => {
  crypto.randomBytes(parseInt(process.env.RESET_TOKEN_LENGTH) / 2, (err, buf) => {
    if (!err) {
      res.locals.randomBytes = buf.toString('hex')
      next()
    } else {
      console.debug('Error creating random bytes\n', err)
      res.status(500)
      next(err)
    }
  })
}

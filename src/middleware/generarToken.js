const crypto = require('crypto');

module.exports = (req, res, next) => {
    crypto.randomBytes(parseInt(process.env.RESET_TOKEN_LENGTH) / 2, (err, buf) => {
        if (!err){
            res.locals.randomBytes = buf.toString('hex');
            next();
        } else {
            console.debug('error creando los randombytes', err)
            res.status(500)
            next(err)
        }
    });
}
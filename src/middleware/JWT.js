const jwt = require('jsonwebtoken');

//exports.generarJWT = ;

const verificarJWT = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: 'Sal, no eres de aqui'});
    try{
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.username = verificar
        next()
    } catch (error) {
        res.status(400).json({error: 'el token no es valido compai me quiere engaña'});
    }
}

module.exports = verificarJWT;
const User = require('../models/userModel');
const verificarJWT = require('./jwt');

checkDuplicateUserOrEmail = (req, res, next) => {
    //username
    User.findById({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: 'Este usuario ya existe'
            });
            return;
        }
        //email
        User.findById({
            where:{
                email: req.body.email
            }
        }).then(user =>{
            if(user) {
                res.status(400).send({
                    message: 'Este email ya existe'
                });
                return;
            }
            next();
        });
    });
}

module.exports = verifysignup;
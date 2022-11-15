module.exports = app => {
    const users = require('../controllers/UserController.js');
    const authenticateJWT = require('../../config/authenticateJWT.js');
    
    app.get('/users', authenticateJWT.verifyToken, users.findAll); // Todos los users (Ready)

    app.post('/users/add', /*authenticateJWT.verifyToken,*/ users.createUserManager); // Crear users (Ready)

    app.post('/users/loginManager', users.loginManager); // Login (Ready)

    app.delete('/users/manager/delete/:id', authenticateJWT.verifyToken, users.deleteUserManager); // Eliminar usuarios del manager (Ready)
    
    app.put('/users/disabled/:id', /*authenticateJWT.verifyToken,*/ users.disabledUser); // Desactivar usuario (Ready)

    app.put('/users/active/:id',/*authenticateJWT.verifyToken,*/ users.activeUser); // Activar usuario (Ready)

    app.post('/users/logout', users.logout); // logout (Ready)

    app.put('/users/updatePass',/*authenticateJWT.verifyToken,*/ users.updatePass); // Editar contraseña (Ready)

    app.put('/users/edit/manager',authenticateJWT.verifyToken, users.editUserManager); // Editar usuario  (Ready)
    
    app.get('/users/findOne',authenticateJWT.verifyToken, users.findOne); // Consultar un users (Ready)

    app.delete('/users/delete/:id',authenticateJWT.verifyToken, users.remove);// Eliminar users (Ready)

}

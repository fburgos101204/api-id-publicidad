module.exports = app => {
    const location = require('../controllers/locationController.js');
    const authenticateJWT = require('../../config/authenticateJWT.js');
    
    app.get('/location/list', authenticateJWT.verifyToken, location.findAll); // Todas las localidades (Ready)

    app.post('/location/add', authenticateJWT.verifyToken, location.createLocation); // Crear localidad (Ready)

    app.put('/location/update/:id',/*authenticateJWT.verifyToken,*/ location.updateLocation); // Editar localidad (Ready)

    app.put('/location/disabled/:id',/*authenticateJWT.verifyToken,*/ location.disabledLocation); // Desactivar localidad (Ready)

    app.put('/location/enabled/:id',/*authenticateJWT.verifyToken,*/ location.enabledLocation); // Activar localidad (Ready)

}

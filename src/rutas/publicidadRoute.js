module.exports = app => {
    const publicidad = require('../controllers/publicidadController.js');
    const authenticateJWT = require('../../config/authenticateJWT.js');
    
    app.get('/publicidad/list', authenticateJWT.verifyToken, publicidad.findAll); // Todas las Publicidad (Ready)

    app.post('/publicidad/add', authenticateJWT.verifyToken, publicidad.createPublicidad); // Crear Publicidad (Ready)

    app.put('/publicidad/update/',/*authenticateJWT.verifyToken,*/ publicidad.updatePublicidad); // Editar Publicidad (Ready)

    app.put('/publicidad/disabled/:id',/*authenticateJWT.verifyToken,*/ publicidad.disabledPublicidad); // Desactivar Publicidad (Ready)

    app.put('/publicidad/enabled/:id',/*authenticateJWT.verifyToken,*/ publicidad.enabledPublicidad); // Activar Publicidad (Ready)

    app.delete('/publicidad/delete/:id',/*authenticateJWT.verifyToken,*/ publicidad.deletePublicidad); // eliminar Publicidad (Ready)

}

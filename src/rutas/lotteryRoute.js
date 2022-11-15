module.exports = app => {
    const lottery = require('../controllers/lotteryController.js');
    const authenticateJWT = require('../../config/authenticateJWT.js');
    
    app.get('/lottery', lottery.findAll); // Todas las loterias (Ready)

    app.get('/lotteryOpen',authenticateJWT.verifyToken, lottery.findAllOpen); // Todas las loterias abiertas (Ready)
    
    app.get('/lottery/:id',authenticateJWT.verifyToken, lottery.findOne); // Buscar una loteria (Ready)

    app.put('/lottery/:id',authenticateJWT.verifyToken, lottery.updateWinners); // Actulizar numeros ganadores (Ready)

    app.put('/lottery/disabled/:id',authenticateJWT.verifyToken, lottery.lotteryDisabled); // Desactivar Loteria (Ready)

    app.put('/lottery/edit/:id',authenticateJWT.verifyToken, lottery.lotteryEdit); // Editar loteria (Ready)

    app.post('/lottery/add', lottery.addLottery); // Agregar loteria (Ready)

    app.delete('/lottery/remove/:id',authenticateJWT.verifyToken, lottery.remove); // Eliminar loteria (Ready)
}

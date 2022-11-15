module.exports = app => {
    const winners = require('../controllers/winnersController.js');
    const authenticateJWT = require('../../config/authenticateJWT.js');
    
    app.get('/winners',authenticateJWT.verifyToken, winners.findAll); // Todos los numeros Ganadores (Ready)
    
    app.get('/winnersByDate',authenticateJWT.verifyToken, winners.findAllByDate); // Todos los numeros Ganadores por fecha (Ready)

    app.get('/winners/lottery/:id',authenticateJWT.verifyToken, winners.findOne); // Buscar una loteria (Ready)

    app.post('/winners/add', winners.addWinners);
    
    app.get('/scrapping/getpage', winners.getpage); // Generar numeros ganadores (Ready)

    app.get('/scrapping/log', winners.logScrappingList); // Log del Scrapping  (Ready)
     
    app.get('/ganadores/list', winners.ganadoresList); // Generar numeros ganadores

}

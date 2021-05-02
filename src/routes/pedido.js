const PedidoController = require('../controllers/PedidoController');

module.exports = app => {
    app.get('/pedido', PedidoController.index);
    app.get('/pedido/:id', PedidoController.detail);
    app.get('/pedido/:id/sendmail', PedidoController.sendMail);
    app.get('/pedido/:id/report', PedidoController.report);
    app.post('/pedido', PedidoController.create);
    app.put('/pedido/:id', PedidoController.edit);
    app.delete('/pedido/:id', PedidoController.delete);
}
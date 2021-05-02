const PedidoController = require('../controllers/PedidoController');

module.exports = app => {
    app.get('/pedido', PedidoController.index);
    app.get('/pedido/:id', PedidoController.detail);
    app.post('/pedido', PedidoController.create);
    app.put('/pedido/:id', PedidoController.edit);
    app.delete('/pedido/:id', PedidoController.delete);
}
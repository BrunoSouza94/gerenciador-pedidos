const ProdutoPedidoController = require('../controllers/ProdutoPedidoController');

module.exports = app => {
    app.get('/produto-pedido', ProdutoPedidoController.index);
    app.get('/produto-pedido/:id', ProdutoPedidoController.detail);
    app.post('/produto-pedido', ProdutoPedidoController.create);
    app.put('/produto-pedido/:id', ProdutoPedidoController.edit)
    app.delete('/produto-pedido/:id', ProdutoPedidoController.delete);
}
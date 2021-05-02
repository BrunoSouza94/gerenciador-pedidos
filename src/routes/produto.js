const ProdutoController = require('../controllers/ProdutoController');

module.exports = app => {
    app.get('/produto', ProdutoController.index);
    app.get('/produto/:id', ProdutoController.detail);
    app.post('/produto', ProdutoController.create);
    app.put('/produto/:id', ProdutoController.edit)
    app.delete('/produto/:id', ProdutoController.delete);
}
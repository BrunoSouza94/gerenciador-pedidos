const ClienteController = require('../controllers/ClienteController');

module.exports = app => {
    app.get('/cliente', ClienteController.index);
    app.get('/cliente/:id', ClienteController.detail);
    app.post('/cliente', ClienteController.create);
    app.put('/cliente/:id', ClienteController.edit)
    app.delete('/cliente/:id', ClienteController.delete);
}
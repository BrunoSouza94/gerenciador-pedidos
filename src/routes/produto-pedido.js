const ProdutoPedidoController = require('../controllers/ProdutoPedidoController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = app => {
    app.get('/produto-pedido', ProdutoPedidoController.index);

    app.get('/produto-pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ProdutoPedidoController.detail);

    app.post('/produto-pedido', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id_pedido: Joi.number().required(),
            id_produto: Joi.number().required(),
            quantidade: Joi.number().required()
        })
    }), ProdutoPedidoController.create);

    app.put('/produto-pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            id_pedido: Joi.number().required(),
            id_produto: Joi.number().required(),
            quantidade: Joi.number().required()
        })
    }), ProdutoPedidoController.edit);

    app.delete('/produto-pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ProdutoPedidoController.delete);
}
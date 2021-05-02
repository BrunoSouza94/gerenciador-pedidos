const PedidoController = require('../controllers/PedidoController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = app => {
    app.get('/pedido', PedidoController.index);

    app.get('/pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), PedidoController.detail);

    app.get('/pedido/:id/sendmail', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), PedidoController.sendMail);

    app.get('/pedido/:id/report', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), PedidoController.report);

    app.post('/pedido', celebrate({
        [Segments.BODY]: Joi.object().keys({
            data_pedido: Joi.date().required(),
            observacoes: Joi.string().required(),
            forma_pagamento: Joi.string().required(),
            id_cliente: Joi.number().required()
        })
    }), PedidoController.create);

    app.put('/pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            data_pedido: Joi.date().required(),
            observacoes: Joi.string().required(),
            forma_pagamento: Joi.string().required(),
            id_cliente: Joi.number().required()
        })
    }), PedidoController.edit);

    app.delete('/pedido/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), PedidoController.delete);
}
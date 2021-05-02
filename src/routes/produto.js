const ProdutoController = require('../controllers/ProdutoController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = app => {
    app.get('/produto', ProdutoController.index);

    app.get('/produto/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ProdutoController.detail);

    app.post('/produto', celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required().min(2),
            cor: Joi.string().required().min(3),
            tamanho: Joi.string().required(),
            valor: Joi.number().required()
        })
    }), ProdutoController.create);

    app.put('/produto/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required().min(2),
            cor: Joi.string().required().min(3),
            tamanho: Joi.string().required(),
            valor: Joi.number().required()
        })
    }), ProdutoController.edit);

    app.delete('/produto/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ProdutoController.delete);
}
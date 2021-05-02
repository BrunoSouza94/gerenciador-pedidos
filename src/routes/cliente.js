const ClienteController = require('../controllers/ClienteController');

const { celebrate, Segments, Joi } = require('celebrate');

module.exports = app => {
    app.get('/cliente', ClienteController.index);

    app.get('/cliente/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ClienteController.detail);

    app.post('/cliente', celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required().min(2),
            cpf: Joi.string().required().length(14),
            sexo: Joi.string().required(),
            email: Joi.string().required().email()
        })
    }), ClienteController.create);

    app.put('/cliente/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required().min(2),
            cpf: Joi.string().required().length(14),
            sexo: Joi.string().required(),
            email: Joi.string().required().email()
        })
    }), ClienteController.edit);

    app.delete('/cliente/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), ClienteController.delete);
}
const dbConnection = require('../database/db_connection');

module.exports = {
    index(req, res) {
        const sql = 'SELECT * FROM PEDIDO';

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(result);
        });
    },

    create(req, res) {
        const pedido = req.body;
        const sql = 'INSERT INTO PEDIDO SET ?';

        dbConnection.query(sql, pedido, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(201).send('Cadastro realizado com sucesso.');
        });
    },

    detail(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM PEDIDO WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);

            if (!result[0]) return res.status(404).send(`Não existem cadastros com ID = ${id}`);

            return res.status(200).json(result[0]);
        });
    },

    edit(req, res) {
        const id = req.params.id;
        const pedido = req.body;

        const sql = `UPDATE PEDIDO SET ? WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, pedido, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro editado com sucesso.');
        });
    },

    delete(req, res) {
        const id = req.params.id;

        const sql = `DELETE FROM PEDIDO WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro removido com sucesso.');
        });
    }
}
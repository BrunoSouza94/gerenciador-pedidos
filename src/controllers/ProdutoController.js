const dbConnection = require('../database/db_connection');

module.exports = {
    index(req, res) {
        const sql = 'SELECT * FROM PRODUTO';

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(result);
        });
    },

    create(req, res) {
        const produto = req.body;
        const sql = 'INSERT INTO PRODUTO SET ?';

        dbConnection.query(sql, produto, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(201).send('Cadastro realizado com sucesso.');
        });
    },

    detail(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM PRODUTO WHERE ID_PRODUTO = ${id}`;

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);

            if (!result[0]) return res.status(404).send(`Não existem cadastros com ID = ${id}`);

            return res.status(200).json(result[0]);
        });
    },

    edit(req, res) {
        const id = req.params.id;
        const produto = req.body;

        const sql = `UPDATE PRODUTO SET ? WHERE ID_PRODUTO = ${id}`;

        dbConnection.query(sql, produto, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro editado com sucesso.');
        });
    },

    delete(req, res) {
        const id = req.params.id;

        const sql = `DELETE FROM PRODUTO WHERE ID_PRODUTO = ${id}`;

        dbConnection.query(sql, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro removido com sucesso.');
        });
    }
}
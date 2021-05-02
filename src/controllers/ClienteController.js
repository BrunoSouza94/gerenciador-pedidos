const dbConnection = require('../database/db_connection');

module.exports = {
    index(req, res) {
        const sql = 'SELECT * FROM CLIENTE';

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(result);
        });
    },

    create(req, res) {
        const cliente = req.body;
        const sql = 'INSERT INTO CLIENTE SET ?';

        dbConnection.query(sql, cliente, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(201).send('Cadastro realizado com sucesso.');
        });
    },

    detail(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM CLIENTE WHERE ID_CLIENTE = ${id}`;

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);

            if (!result[0]) return res.status(404).send(`Não existem cadastros com ID = ${id}`);

            return res.status(200).json(result[0]);
        });
    },

    edit(req, res) {
        const id = req.params.id;
        const cliente = req.body;

        const sql = `UPDATE CLIENTE SET ? WHERE ID_CLIENTE = ${id}`;

        dbConnection.query(sql, cliente, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro editado com sucesso.');
        });
    },

    delete(req, res) {
        const id = req.params.id;

        const sql = `delete from cliente where ID_CLIENTE = ${id}`;

        dbConnection.query(sql, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro removido com sucesso.');
        });
    }
}
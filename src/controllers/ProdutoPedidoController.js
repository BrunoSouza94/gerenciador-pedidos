const dbConnection = require('../database/db_connection');

module.exports = {
    index(req, res) {
        const sql = 'SELECT * FROM PRODUTO_PEDIDO';

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(result);
        });
    },

    create(req, res) {
        const produtoPedido = req.body;
        const sql = 'INSERT INTO PRODUTO_PEDIDO SET ?';

        dbConnection.query(sql, produtoPedido, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(201).send('Cadastro realizado com sucesso.');
        });
    },

    detail(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM PRODUTO_PEDIDO WHERE ID_PRODUTO_PEDIDO = ${id}`;

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);

            if (!result[0]) return res.status(404).send(`Não existem cadastros com ID = ${id}`);

            return res.status(200).json(result[0]);
        });
    },

    edit(req, res) {
        const id = req.params.id;
        const produtoPedido = req.body;

        const sql = `UPDATE PRODUTO_PEDIDO SET ? WHERE ID_PRODUTO_PEDIDO = ${id}`;

        dbConnection.query(sql, produtoPedido, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro editado com sucesso.');
        });;
    },

    delete(req, res) {
        const id = req.params.id;

        const sql = `DELETE FROM PRODUTO_PEDIDO WHERE ID_PRODUTO_PEDIDO = ${id}`;

        dbConnection.query(sql, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro removido com sucesso.');
        });
    }
}
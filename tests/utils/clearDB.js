const dbConnection = require('../../src/database/db_connection');

module.exports = dbConnection.connect(async (error) => {
    const sql = "DROP TABLE IF EXISTS CLIENTE, PRODUTO, PEDIDO, PRODUTO_PEDIDO";

    await dbConnection.promise().query(sql)
        .catch((error) => {
            return console.error(error);
        });

    console.log('Tabelas removidas');
    process.exit();
});
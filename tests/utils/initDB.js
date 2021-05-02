const Tables = require('../../src/database/tables');
const dbConnection = require('../../src/database/db_connection');

module.exports = dbConnection.connect(async (error) => {
    if (error) return console.log(error);

    await Tables.init(dbConnection);

    console.log('Tabelas criadas');
    process.exit();
});
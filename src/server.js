const app = require('./app');
const dbConnection = require('./database/db_connection');
const Tables = require('./database/tables');

module.exports = dbConnection.connect(async (error) => {
    if (error) return console.log(error);

    await Tables.init(dbConnection);

    app.listen(3333);
});
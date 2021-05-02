class Tables {
    async init(connection) {
        this.connection = connection;

        await this.createCliente();
        await this.createProduto();
        await this.createPedido();
        await this.createProdutoPedido();
    }

    async createCliente() {
        const sql = 'CREATE TABLE IF NOT EXISTS CLIENTE ' +
            '(ID_CLIENTE int NOT NULL AUTO_INCREMENT, ' +
            'NOME varchar(50) NOT NULL, ' +
            'CPF varchar(15) NOT NULL, ' +
            'SEXO varchar(9) NOT NULL, ' +
            'EMAIL varchar(100) NOT NULL, ' +
            'PRIMARY KEY (ID_CLIENTE))';

        await this.connection.promise().query(sql)
            .catch((error) => {
                console.error(error);
            });
    }

    async createProduto() {
        const sql = 'CREATE TABLE IF NOT EXISTS PRODUTO ' +
            '(ID_PRODUTO int NOT NULL AUTO_INCREMENT, ' +
            'NOME varchar(50) NOT NULL, ' +
            'COR varchar(20) NOT NULL, ' +
            'TAMANHO varchar(20) NOT NULL, ' +
            'VALOR decimal(15,2) NOT NULL, ' +
            'PRIMARY KEY (ID_PRODUTO))';

        await this.connection.promise().query(sql)
            .catch((error) => {
                console.error(error);
            });
    }

    async createPedido() {
        const sql = 'CREATE TABLE IF NOT EXISTS PEDIDO ' +
            '(ID_PEDIDO int NOT NULL AUTO_INCREMENT, ' +
            'DATA_PEDIDO date NOT NULL, ' +
            'OBSERVACOES varchar(200) NOT NULL, ' +
            'FORMA_PAGAMENTO varchar(200) NOT NULL, ' +
            'ID_CLIENTE int NOT NULL, ' +
            'PRIMARY KEY (ID_PEDIDO), ' +
            'FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE(ID_CLIENTE) ON DELETE CASCADE)';

        await this.connection.promise().query(sql)
            .catch((error) => {
                console.error(error);
            });
    }

    async createProdutoPedido() {
        const sql = 'CREATE TABLE IF NOT EXISTS PRODUTO_PEDIDO ' +
            '(ID_PRODUTO_PEDIDO int NOT NULL AUTO_INCREMENT, ' +
            'ID_PRODUTO int NOT NULL, ' +
            'ID_PEDIDO int NOT NULL, ' +
            'QUANTIDADE int NOT NULL, ' +
            'PRIMARY KEY (ID_PRODUTO_PEDIDO), ' +
            'FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO(ID_PRODUTO) ON DELETE CASCADE, ' +
            'FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO(ID_PEDIDO) ON DELETE CASCADE)';

        await this.connection.promise().query(sql)
            .catch((error) => {
                console.error(error);
            });
    }
}

module.exports = new Tables;
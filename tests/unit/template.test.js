const { expect } = require('@jest/globals');
const template = require('../../src/views/template');

describe('Template do E-Mail e Relatório', () => {
    it('Deve gerar uma string contendo código html com informações sobre o pedido', () => {
        const itens = [
            {
                NOME: 'Playstation 5',
                QUANTIDADE: 1,
                VALOR: 4799.99,
                TAMANHO: '39 CM'
            },
            {
                NOME: 'Xbox Series X',
                QUANTIDADE: 2,
                VALOR: 4499.99,
                TAMANHO: '31 CM'
            }
        ];

        const infos = [{
            NOME: 'Bruno',
            DATA_PEDIDO: '2021-04-30T03:00:00.000Z',
            FORMA_PAGAMENTO: 'Cartão de Crédito - Online',
            OBSERVACOES: 'Entregar somente para Bruno'
        }];

        const dateResult = new Date(infos[0].DATA_PEDIDO).toLocaleDateString();

        result = template.generateHTML(JSON.stringify(infos), JSON.stringify(itens));

        expect(result).toBe(`<h1>Pedido</h1><div><strong>Nome: </strong>Bruno</div><div><strong>Data do Pedido: </strong>${dateResult}</div><div><strong>Forma de Pagamento: </strong>Cartão de Crédito - Online</div> <div><strong>Observações: </strong>Entregar somente para Bruno</div><h2> Itens </h2><div><strong>Produto: </strong>Playstation 5</div><div><strong>Quantidade: </strong>1</div><div><strong>Valor: </strong>R$ 4799.99</div><div><strong>Subtotal: </strong>4799.99<div><strong>Tamanho: </strong>39 CM</div><br><div><strong>Produto: </strong>Xbox Series X</div><div><strong>Quantidade: </strong>2</div><div><strong>Valor: </strong>R$ 4499.99</div><div><strong>Subtotal: </strong>8999.98<div><strong>Tamanho: </strong>31 CM</div><br><h3>Total: R$ 13799.97</h3>`);
    });
});
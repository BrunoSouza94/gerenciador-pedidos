module.exports = {
    generateHTML(infos, itens) {
        if (infos && infos.length > 0) infos = JSON.parse(infos)[0];
        itens = JSON.parse(itens);

        let valorTotal = 0;

        let html = `<h1>Pedido</h1>` +
            `<div><strong>Nome: </strong>${infos.NOME}</div>` +
            `<div><strong>Data do Pedido: </strong>${new Date(infos.DATA_PEDIDO).toLocaleDateString()}</div>` +
            `<div><strong>Forma de Pagamento: </strong>${infos.FORMA_PAGAMENTO}</div> ` +
            `<div><strong>Observações: </strong>${infos.OBSERVACOES}</div>` +
            `<h2> Itens </h2>`;

        itens.forEach((item) => {
            html += `<div><strong>Produto: </strong>${item.NOME}</div>` +
                `<div><strong>Quantidade: </strong>${item.QUANTIDADE}</div>` +
                `<div><strong>Valor: </strong>R$ ${item.VALOR}</div>` +
                `<div><strong>Subtotal: </strong>${item.VALOR * item.QUANTIDADE}` +
                `<div><strong>Tamanho: </strong>${item.TAMANHO}</div>` +
                `<br>`;

            valorTotal += (item.VALOR * item.QUANTIDADE);
        });

        html += `<h3>Total: R$ ${valorTotal}</h3>`;

        return html;
    }
}
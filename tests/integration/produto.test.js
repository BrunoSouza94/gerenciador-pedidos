const request = require('supertest');

const app = require('../../src/app');

describe("POST /produto", () => {
    it("Deve criar um novo produto", async (done) => {
        const produto = {
            nome: "Playstation 5",
            cor: "Branco",
            tamanho: "39 CM",
            valor: 4799.99
        };

        const response = await request(app)
            .post('/produto')
            .send(produto);

        expect(response.text).toBe('Cadastro realizado com sucesso.');
        expect(response.status).toBe(201);

        done();
    });
});

describe("GET /produto", () => {
    it("Deve devolver todos produtos cadastrados", async (done) => {
        const response = await request(app)
            .get('/produto');

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);

        done();
    });
});

describe("GET /produto/:id", () => {
    it("Deve devolver um produto com id específico cadastrado", async (done) => {
        const response = await request(app)
            .get('/produto/1');

        expect(response.body).toHaveProperty('ID_PRODUTO', 1);
        expect(response.body).toHaveProperty('NOME', 'Playstation 5');
        expect(response.body).toHaveProperty('COR', 'Branco');
        expect(response.body).toHaveProperty('TAMANHO', '39 CM');
        expect(response.body).toHaveProperty('VALOR', '4799.99');

        expect(response.status).toBe(200);

        done();
    });
});

describe("PUT /produto/:id", () => {
    it("Deve editar cadastro com id específico", async (done) => {
        const produto = {
            nome: "Playstation 5 s/ leitor de bluray",
            cor: "Branco",
            tamanho: "39 CM",
            valor: 4399.99
        };

        const response = await request(app)
            .put('/produto/1')
            .send(produto);

        expect(response.text).toBe('Cadastro editado com sucesso.');
        expect(response.status).toBe(200);

        done();
    });
});

describe("GET /produto/:id", () => {
    it("Deve devolver um produto com id específico cadastrado após edição", async (done) => {
        const response = await request(app)
            .get('/produto/1');

        expect(response.body).toHaveProperty('ID_PRODUTO', 1);
        expect(response.body).toHaveProperty('NOME', 'Playstation 5 s/ leitor de bluray');
        expect(response.body).toHaveProperty('COR', 'Branco');
        expect(response.body).toHaveProperty('TAMANHO', '39 CM');
        expect(response.body).toHaveProperty('VALOR', '4399.99');

        expect(response.status).toBe(200);

        done();
    });
});

describe("DELETE /produto/:id", () => {
    it("Deve remover cadastro com id específico", async (done) => {
        const response = await request(app)
            .delete('/produto/1');

        expect(response.text).toBe('Cadastro removido com sucesso.');

        expect(response.status).toBe(200);

        done();
    });
});
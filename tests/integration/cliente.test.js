const { afterAll, expect } = require('@jest/globals');
const request = require('supertest');

const app = require('../../src/app');

describe("POST /cliente", () => {
    it("Deve criar um novo cliente", async (done) => {
        const cliente = {
            nome: "Amanda",
            cpf: '328.025.999-17',
            sexo: 'Feminino',
            email: 'amanda@gmail.com'
        };

        const response = await request(app)
            .post('/cliente')
            .send(cliente);

        expect(response.text).toBe('Cadastro realizado com sucesso.');
        expect(response.status).toBe(201);

        done();
    });
});

describe("GET /cliente", () => {
    it("Deve devolver todos clientes cadastrados", async (done) => {
        const response = await request(app)
            .get('/cliente');

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);

        done();
    });
});

describe("GET /cliente/:id", () => {
    it("Deve devolver um cliente com id específico cadastrado", async (done) => {
        const response = await request(app)
            .get('/cliente/1');

        expect(response.body).toHaveProperty('ID_CLIENTE', 1);
        expect(response.body).toHaveProperty('NOME', 'Amanda');
        expect(response.body).toHaveProperty('CPF', '328.025.999-17');
        expect(response.body).toHaveProperty('SEXO', 'Feminino');
        expect(response.body).toHaveProperty('EMAIL', 'amanda@gmail.com');

        expect(response.status).toBe(200);

        done();
    });
});

describe("PUT /cliente/:id", () => {
    it("Deve editar cadastro com id específico", async (done) => {
        const cliente = {
            nome: 'Amanda Costa',
            cpf: '333.222.999-11',
            sexo: 'Feminino',
            email: 'amandacosta@gmail.com'
        };

        const response = await request(app)
            .put('/cliente/1')
            .send(cliente);

        expect(response.text).toBe('Cadastro editado com sucesso.');
        expect(response.status).toBe(200);

        done();
    });
});

describe("GET /cliente/:id", () => {
    it("Deve devolver um cliente com id específico cadastrado após edição", async (done) => {
        const response = await request(app)
            .get('/cliente/1');

        expect(response.body).toHaveProperty('ID_CLIENTE', 1);
        expect(response.body).toHaveProperty('NOME', 'Amanda Costa');
        expect(response.body).toHaveProperty('CPF', '333.222.999-11');
        expect(response.body).toHaveProperty('SEXO', 'Feminino');
        expect(response.body).toHaveProperty('EMAIL', 'amandacosta@gmail.com');

        expect(response.status).toBe(200);

        done();
    });
});

describe("DELETE /cliente/:id", () => {
    it("Deve remover cadastro com id específico", async (done) => {
        const response = await request(app)
            .delete('/cliente/1');

        expect(response.text).toBe('Cadastro removido com sucesso.');

        expect(response.status).toBe(200);

        done();
    });
});
const dbConnection = require('../database/db_connection');
const htmlGenerator = require('../views/template');
const smtpConfig = require('../config/smtp');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');

module.exports = {
    index(req, res) {
        const sql = 'SELECT * FROM PEDIDO';

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(result);
        });
    },

    create(req, res) {
        const pedido = req.body;
        const sql = 'INSERT INTO PEDIDO SET ?';

        dbConnection.query(sql, pedido, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(201).send('Cadastro realizado com sucesso.');
        });
    },

    detail(req, res) {
        const id = req.params.id;

        const sql = `SELECT * FROM PEDIDO WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, (error, result) => {
            if (error) return res.status(500).json(error);

            if (!result[0]) return res.status(404).send(`Não existem cadastros com ID = ${id}`);

            return res.status(200).json(result[0]);
        });
    },

    edit(req, res) {
        const id = req.params.id;
        const pedido = req.body;

        const sql = `UPDATE PEDIDO SET ? WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, pedido, (error, result) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro editado com sucesso.');
        });
    },

    delete(req, res) {
        const id = req.params.id;

        const sql = `DELETE FROM PEDIDO WHERE ID_PEDIDO = ${id}`;

        dbConnection.query(sql, (error) => {
            if (error) return res.status(500).json(error);
            return res.status(200).send('Cadastro removido com sucesso.');
        });
    },

    async sendMail(req, res) {
        const id = req.params.id;

        await generateReportOrEmail(id, 'email', res);
    },

    async report(req, res) {
        const id = req.params.id;

        await generateReportOrEmail(id, 'report', res);
    }
}

async function generateReportOrEmail(id, type, res) {
    let itens,
        infos;

    const sqlItens = `SELECT  A.QUANTIDADE, B.NOME, B.VALOR, B.TAMANHO 
            FROM PRODUTO_PEDIDO A 
            INNER JOIN PRODUTO B ON B.ID_PRODUTO = A.ID_PRODUTO 
            WHERE A.ID_PEDIDO = ${id}`;

    const sqlInfos = `SELECT A.DATA_PEDIDO, A.OBSERVACOES, A.FORMA_PAGAMENTO, B.NOME, B.EMAIL
            FROM PEDIDO A
            INNER JOIN CLIENTE B ON B.ID_CLIENTE = A.ID_CLIENTE
            WHERE A.ID_PEDIDO = ${id}`;

    await dbConnection.promise().query(sqlItens)
        .then(result => {
            itens = JSON.stringify(result[0]);
        })
        .catch(error => {
            return res.status(500).send(error);
        });

    await dbConnection.promise().query(sqlInfos)
        .then(result => {
            infos = JSON.stringify(result[0]);
        })
        .catch(error => {
            return res.status(500).send(error);
        });

    const html = htmlGenerator.generateHTML(infos, itens),
        email = JSON.parse(infos)[0].EMAIL

    if (type === 'email') await generateEmail(html, email, res);
    else if (type === 'report') await generateReport(html, res);
}

async function generateEmail(html, email, res) {
    const transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: false,
        auth: {
            user: smtpConfig.user,
            pass: smtpConfig.password
        }
    });

    await transporter.sendMail({
        from: '"VIP Commerce" <bruno.nodemailer.send@gmail.com>',
        to: `${email}`,
        subject: "Resumo do Pedido",
        html: html,
    });

    res.send("E-Mail enviado com sucesso, favor verificar sua caixa de entrada");
}

async function generateReport(html, res) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'Relatório do Pedido.pdf',
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        relatDir = __dirname + '../../../Relatório do Pedido.pdf';

        return res.download(relatDir);
    } catch (e) {
        return res.status(500).json(e);
    }
}
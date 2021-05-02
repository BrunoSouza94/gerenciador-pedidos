require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.use(express.json());

    consign()
        .include('src/routes')
        .into(app);

    return app;
}
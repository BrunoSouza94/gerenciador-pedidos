const expressConfig = require('./config/expressConfig');

class AppController {
    constructor() {
        this.express = expressConfig();
    }
}

module.exports = new AppController().express;
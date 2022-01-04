"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('heroku_598927b1f7bb515', 'b00ea2cdcc89b9', '2e4734e9', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mariadb',
    //logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map
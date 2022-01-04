import { Sequelize } from "sequelize";

const db = new Sequelize('heroku_598927b1f7bb515', 'b00ea2cdcc89b9', '2e4734e9',{
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mariadb',
    //logging: false
});

export default db;
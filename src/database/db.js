const Sequelize = require("sequelize");
const UserModel = require('../models/user');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Oladerio!1234',
    database: 'stream_app',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
 })


const User = UserModel(sequelize, Sequelize);

sequelize.sync({force: false}).then(() => {
    console.log('synchronize data');
})

module.exports = {
    User
}
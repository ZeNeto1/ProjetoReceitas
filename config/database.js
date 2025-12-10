const { Sequelize } = require('sequelize');

// Cria a conexão com o banco SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Onde o arquivo do banco será salvo
    logging: false // Desativa logs de SQL no console
});

module.exports = sequelize;
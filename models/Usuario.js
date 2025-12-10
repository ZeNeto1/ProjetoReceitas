const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false // Campo obrigatório
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Não permite emails repetidos
    }
});

module.exports = Usuario;
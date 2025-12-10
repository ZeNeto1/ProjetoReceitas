const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Receita = db.define('Receita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    tempoPreparo: {
        type: DataTypes.INTEGER, // Em minutos
        allowNull: false
    }
});

module.exports = Receita;
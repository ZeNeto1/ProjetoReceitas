const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Avaliacao = db.define('Avaliacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Validação automática: mínimo 1
            max: 5  // Validação automática: máximo 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true // Comentário é opcional
    }
});

module.exports = Avaliacao;
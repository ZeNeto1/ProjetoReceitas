const Usuario = require('./Usuario');
const Receita = require('./Receita');
const Avaliacao = require('./Avaliacao');

Usuario.hasMany(Receita, { foreignKey: 'autorId', onDelete: 'CASCADE' });
Receita.belongsTo(Usuario, { foreignKey: 'autorId' });

Receita.hasMany(Avaliacao, { foreignKey: 'receitaId', onDelete: 'CASCADE' });
Avaliacao.belongsTo(Receita, { foreignKey: 'receitaId' });

Usuario.hasMany(Avaliacao, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = {
    Usuario,
    Receita,
    Avaliacao
};
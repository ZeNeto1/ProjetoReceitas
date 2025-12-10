const Usuario = require('./Usuario');
const Receita = require('./Receita');
const Avaliacao = require('./Avaliacao');

Usuario.hasMany(Receita, { foreignKey: 'autorId' });
Receita.belongsTo(Usuario, { foreignKey: 'autorId' });

Receita.hasMany(Avaliacao, { foreignKey: 'receitaId' });
Avaliacao.belongsTo(Receita, { foreignKey: 'receitaId' });

Usuario.hasMany(Avaliacao, { foreignKey: 'usuarioId' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = {
    Usuario,
    Receita,
    Avaliacao
};
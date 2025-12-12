// controllers/avaliacaoController.js
const { Avaliacao, Receita, Usuario } = require('../models/Associacoes');
const { Op } = require('sequelize');

// Variáveis para mensagens flash (assumindo que você usa session ou flash messages)
const SUCCESS_MSG = 'Avaliação salva com sucesso!';
const DUPLICATE_MSG = 'Você já possui uma avaliação para esta receita.';
const ERROR_MSG = 'Erro ao processar sua avaliação. Tente novamente.';

async function checarDuplicidade(usuarioId, receitaId, avaliacaoId = null) {
    const whereClause = {
        usuarioId: usuarioId,
        receitaId: receitaId
    };

    // Se estiver editando, ignore o ID da avaliação atual na checagem.
    // Ex: Se estou editando a avaliação ID 5, não quero que ela conte como duplicada.
    if (avaliacaoId) {
        whereClause.id = { [Op.ne]: avaliacaoId }; // [Op.ne] = Not Equal (Diferente de)
    }

    const count = await Avaliacao.count({ where: whereClause });
    return count > 0;
}

module.exports = {

    //Mostrar formulário de avaliação
    async create(req, res) {
        try {
            const { receitaId, error } = req.query; // Pega o ID da receita e a mensagem de erro da query
            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();
            
            return res.render('avaliacoes/create', { 
                usuarios, 
                receitas, 
                receitaId, 
                avaliacao: null,
                error: error // Passa a mensagem de erro para a view
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar formulário');
        }
    },

    //Salvar avaliação
    async store(req, res) {
        try {
            const { usuarioId, receitaId } = req.body;

            // Checa duplicidade antes de criar
            if (await checarDuplicidade(usuarioId, receitaId)) {
                // Redireciona de volta para o formulário com a mensagem de erro na URL
                // Você precisará configurar sua rota para aceitar o parâmetro na query.
                return res.redirect(`/avaliacoes/create?receitaId=${receitaId}&error=${encodeURIComponent(DUPLICATE_MSG)}`);
            }

            await Avaliacao.create(req.body);
            // Recomendo usar 'flash messages' aqui para exibir o sucesso
            return res.redirect(`/receitas/${receitaId}`); 
        } catch (err) {
            console.error(err);
            // Redireciona com erro genérico
            const receitaId = req.body.receitaId || '';
            return res.redirect(`/avaliacoes/create?receitaId=${receitaId}&error=${encodeURIComponent(ERROR_MSG)}`);
        }
    },

    async edit(req, res) {
        try {
            const { error } = req.query; // Pega a mensagem de erro da query
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();

            if (!avaliacao) {
                return res.status(404).send('Avaliação não encontrada');
            }
            return res.render('avaliacoes/create', { 
                avaliacao, 
                usuarios, 
                receitas, 
                error: error, // Passa a mensagem de erro
                receitaId: avaliacao.receitaId 
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar avaliação');
        }
    },

    // Atualizar avaliação (PUT)
    async update(req, res) {
        try {
            const avaliacaoId = req.params.id;
            const { usuarioId, receitaId } = req.body;

            const avaliacao = await Avaliacao.findByPk(avaliacaoId);
            if (!avaliacao) {
                return res.status(404).send('Avaliação não encontrada');
            }
            
            // Checa duplicidade, AGORA PASSANDO o ID da avaliação que estamos editando
            if (await checarDuplicidade(usuarioId, receitaId, avaliacaoId)) {
                // Redireciona de volta para o formulário de edição com a mensagem de erro
                return res.redirect(`/avaliacoes/${avaliacaoId}/editar?error=${encodeURIComponent(DUPLICATE_MSG)}`);
            }

            await avaliacao.update(req.body);
            // Recomendo usar 'flash messages' aqui para exibir o sucesso
            return res.redirect(`/receitas/${receitaId}`);
        } catch (err) {
            console.error(err);
            const receitaId = req.body.receitaId || '';
            // Redireciona com erro genérico
            return res.redirect(`/avaliacoes/${req.params.id}/editar?error=${encodeURIComponent(ERROR_MSG)}`);
        }
    },

    // (opcional) deletar
    async destroy(req, res) {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) return res.status(404).send('Avaliação não encontrada');
            const receitaId = avaliacao.receitaId;
            await avaliacao.destroy();
            return res.redirect(`/receitas/${receitaId}`);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir avaliação');
        }
    }
};
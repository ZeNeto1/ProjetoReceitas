// controllers/avaliacaoController.js
const { Avaliacao, Receita, Usuario } = require('../models/Associacoes');

module.exports = {

    //Mostrar formulário de avaliação
    async create(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();
            const receitaId = req.query.receitaId || null; // pega o id vindo da query (se houver)
            return res.render('avaliacoes/create', { usuarios, receitas, receitaId, avaliacao: null });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar formulário');
        }
    },

    //Salvar avaliação
    async store(req, res) {
        try {
            // No req.body vai vir: ids, nota e comentario
            await Avaliacao.create(req.body);
            return res.redirect(`/receitas/${req.body.receitaId}`);
        } catch (err) {
            console.error(err);
            return res.status(400).send('Erro ao salvar avaliação');
        }
    },

    async edit(req, res) {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) return res.status(404).send('Avaliação não encontrada');

            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();

            // passa avaliacao para preencher o formulário; receitaId ajuda a selecionar receita
            return res.render('avaliacoes/create', { usuarios, receitas, receitaId: avaliacao.receitaId, avaliacao });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar edição da avaliação');
        }
    },

    // Atualizar avaliação (PUT)
    async update(req, res) {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) return res.status(404).send('Avaliação não encontrada');

            // req.body deve ter nota, comentario, usuarioId, receitaId
            await avaliacao.update({
                nota: req.body.nota,
                comentario: req.body.comentario,
                usuarioId: req.body.usuarioId,
                receitaId: req.body.receitaId
            });

            // redireciona para a receita da avaliação (pode ajustar conforme preferir)
            return res.redirect(`/receitas/${avaliacao.receitaId}`);
        } catch (err) {
            console.error(err);
            return res.status(400).send('Erro ao atualizar avaliação');
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
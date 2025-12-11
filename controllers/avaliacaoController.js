// controllers/avaliacaoController.js
const { Avaliacao, Receita, Usuario } = require('../models/Associacoes');

module.exports = {

    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();
            // incluir associações para que avaliacao.Receita e avaliacao.Usuario existam
            const avaliacoes = await Avaliacao.findAll({
                include: [Receita, Usuario]
            });

            return res.render('avaliacoes/index', { usuarios, receitas, avaliacoes });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar avaliações');
        }
    },

    //Mostrar formulário de avaliação
    async create(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            const receitas = await Receita.findAll();
            const receitaId = req.query.receitaId || null; // pega o id vindo da query (se houver)
            return res.render('avaliacoes/create', { usuarios, receitas, receitaId });
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
            return res.redirect('/receitas');
        } catch (err) {
            console.error(err);
            return res.status(400).send('Erro ao salvar avaliação');
        }
    }
};
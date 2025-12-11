// controllers/receitaController.js
const { Receita, Usuario, Avaliacao } = require('../models/Associacoes');

module.exports = {
    //Listar todas as receitas
    async index(req, res) {
        try {
            const receitas = await Receita.findAll({
                include: Usuario // Inclui dados do autor
            });
            return res.render('receitas/index', { receitas });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar receitas');
        }
    },

    //Mostrar formulário de criação
    async create(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            return res.render('receitas/create', { usuarios, receita : null });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar formulário');
        }
    },

    //Salvar receita
    async store(req, res) {
        try {
            // No req.body vai vir: titulo, descricao, tempoPreparo e autorId
            await Receita.create(req.body);
            return res.redirect('/receitas');
        } catch (err) {
            console.error(err);
            return res.status(400).send('Erro ao salvar receita');
        }
    },

    // Mostrar formulário de edição
    async edit(req, res) {
        try {
            const receita = await Receita.findByPk(req.params.id);
            const usuarios = await Usuario.findAll();
            if (!receita) {
                return res.status(404).send('Receita não encontrada');
            }
            return res.render('receitas/create', { receita, usuarios });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar receita');
        }
    },

    // Atualizar receita
    async update(req, res) {
        try {
            const receita = await Receita.findByPk(req.params.id);
            if (!receita) {
                return res.status(404).send('Receita não encontrada');
            }
            await receita.update(req.body);
            return res.redirect('/receitas');
        } catch (err) {
            console.error(err);
            return res.status(400).send('Erro ao atualizar receita');
        }
    },

    // Deletar receita
    async destroy(req, res) {
        try {
            const receita = await Receita.findByPk(req.params.id);
            if (!receita) {
                return res.status(404).send('Receita não encontrada');
            }
            await receita.destroy();
            return res.redirect('/receitas');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir receita');
        }
    },

    // Mostrar detalhes de uma receita
    async show(req, res) {
        try {
            const receita = await Receita.findByPk(req.params.id, {
                include: [
                    Usuario,
                    { model: Avaliacao, include: Usuario }
                ]
            });
            if (!receita) {
                return res.status(404).send('Receita não encontrada');
            }
            return res.render('receitas/show', { receita });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar receita');
        }
    }
};
// controllers/receitaController.js
const { Receita, Usuario } = require('../models/Associacoes');

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
            return res.render('receitas/create', { usuarios });
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
    }
};
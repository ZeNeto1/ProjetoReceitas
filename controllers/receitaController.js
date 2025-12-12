// controllers/receitaController.js
const { Receita, Usuario, Avaliacao } = require('../models/Associacoes');
const { Op } = require('sequelize'); // Importa operadores do Sequelize
const db = require('../config/database');

module.exports = {
    //Listar todas as receitas
    async index(req, res) {
        try {
            const receitas = await Receita.findAll({
                attributes: {
                    include: [
                        // Adiciona um campo extra 'mediaNotas' usando SQL AVG
                        [
                            db.fn('AVG', db.col('Avaliacaos.nota')), 
                            'mediaNotas'
                        ],
                        [
                            db.fn('COUNT', db.col('Avaliacaos.id')), 
                            'totalAvaliacoes'
                        ]
                    ]
                },
                include: [
                    { model: Usuario }, // Traz o autor
                    { model: Avaliacao, attributes: [] } // Inclui avaliações mas não traz os dados delas (só para o cálculo)
                ],
    // Agrupa por receita para o cálculo funcionar, porque se nao ele faria o calculo de todas as avaliações de todas as receitas juntas
                group: ['Receita.id'] 
            });

            return res.render('receitas/index', { receitas });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar receitas');
        }
    },
    // Pesquisa de receitas por título e autor
    async search(req, res) {
        try {
            const { termo } = req.query;

            if (!termo) {
                return res.redirect('/receitas');
            }

            const receitas = await Receita.findAll({
                // Condição de busca usando LIKE para título e nome do autor
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: `%${termo}%` } },
                        { '$Usuario.nome$': { [Op.like]: `%${termo}%` } } 
                    ] 
                },
                // Agregações para média e contagem de avaliações
                attributes: {
                    include: [
                        [
                            db.fn('AVG', db.col('Avaliacaos.nota')), 
                            'mediaNotas'
                        ],
                        [
                            db.fn('COUNT', db.col('Avaliacaos.id')), 
                            'totalAvaliacoes'
                        ]
                    ]
                },
                // Inclusões necessárias para autor e avaliações
                include: [
                    { 
                        model: Usuario,
                        required: true // INNER JOIN: Garante que só venham receitas com autor
                    },
                    { 
                        model: Avaliacao, 
                        attributes: [] // Não trazemos os dados brutos, apenas para o cálculo
                    }
                ],
                // Agrupamento (Obrigatório quando usamos AVG/COUNT com Joins)
                group: ['Receita.id'],
                subQuery: false // Evita problemas com subqueries no Sequelize
            });

            return res.render('receitas/index', { 
                receitas, 
                termo // Passa o termo para a view para manter no campo de busca
            });

        } catch (err) {
            console.error("Erro na busca:", err);
            return res.status(500).send('Erro na pesquisa');
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

            const avaliacoes = receita.Avaliacaos || receita.Avaliacoes || [];
            const media = avaliacoes.length
                ? (avaliacoes.reduce((s, a) => s + (a.nota || 0), 0) / avaliacoes.length)
                : null;

            if (!receita) {
                return res.status(404).send('Receita não encontrada');
            }
            return res.render('receitas/show', { receita, avaliacoes, media });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar receita');
        }
    }
};
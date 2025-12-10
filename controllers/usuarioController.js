// controllers/usuarioController.js
const { Usuario } = require('../models/Associacoes');

module.exports = {
    //Método para LISTAR todos os usuários (GET)
    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll(); // Busca todos no banco
            // Renderiza a view 'usuarios/index', passando a lista de usuários
            return res.render('usuarios/index', { usuarios });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar usuários');
        }
    },

    //Método para mostrar o FORMULÁRIO de criação (GET)
    create(req, res) {
        return res.render('usuarios/create');
    },

    //Método para SALVAR o usuário no banco (POST)
    async store(req, res) {
        try {
            // Pega os dados que vieram do formulário
            const { nome, email } = req.body;
            
            // Cria no banco de dados
            await Usuario.create({ nome, email });
            
            // Redireciona de volta para a lista
            return res.redirect('/usuarios');
        } catch (err) {
            console.error(err);
            // Se der erro (ex: email duplicado), mostra na tela
            return res.status(400).send('Erro ao criar usuário: ' + err.message);
        }
    }
};
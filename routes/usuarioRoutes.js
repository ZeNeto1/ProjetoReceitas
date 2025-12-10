const express = require('express');
const router = express.Router(); 
const usuarioController = require('../controllers/usuarioController');

// /usuarios/ (Lista todos)
router.get('/', usuarioController.index);

// /usuarios/novo (Mostra o formulário)
router.get('/novo', usuarioController.create);

// /usuarios/salvar (Recebe os dados do form)
router.post('/salvar', usuarioController.store);

module.exports = router;
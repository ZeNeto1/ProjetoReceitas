const express = require('express');
const router = express.Router(); 
const avaliacaoController = require('../controllers/avaliacaoController');

// /avaliacoes/ (Lista todos)
router.get('/', avaliacaoController.index);

// /avaliacaos/create (Mostra o formulário)
router.get('/create', avaliacaoController.create);

// /avaliacaos/salvar (Recebe os dados do form)
router.post('/salvar', avaliacaoController.store);

module.exports = router;
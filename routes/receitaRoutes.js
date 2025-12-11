const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// /receitas/ (Lista todos)
router.get('/', receitaController.index);

// /receitas/nova (Mostra o formulário)
router.get('/nova', receitaController.create);

// /receitas/salvar (Mostra o formulário)
router.post('/salvar', receitaController.store);

module.exports = router;
const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// /receitas/ (Lista todos)
router.get('/', receitaController.index);

// /receitas/salvar (Mostra o formulário)
router.post('/', receitaController.store);

// /receitas/nova (Mostra o formulário)
router.get('/nova', receitaController.create);

// /receitas/:id (Mostra detalhes de uma receita)
router.get('/:id', receitaController.show);

// /receitas/:id (Atualiza os dados da receita)
router.put('/:id', receitaController.update);

// /receitas/:id (Deleta uma receita)
router.delete('/:id', receitaController.destroy);

// /receitas/:id (Mostra detalhes de uma receita)
router.get('/:id/editar', receitaController.edit);

module.exports = router;
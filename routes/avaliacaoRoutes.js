const express = require('express');
const router = express.Router(); 
const avaliacaoController = require('../controllers/avaliacaoController');




// /avaliacoes/salvar (Recebe os dados do form)
router.post('/', avaliacaoController.store);




// /avaliacoes/:id (Atualiza os dados da avaliação)
router.put('/:id', avaliacaoController.update);

// /avaliacoes/:id (Deleta uma avaliação)
router.delete('/:id', avaliacaoController.destroy);

// /avaliacoes/create (Mostra o formulário)
router.get('/create', avaliacaoController.create);

// /avaliacoes/:id (Mostra detalhes de uma avaliação)
router.get('/:id/editar', avaliacaoController.edit);

module.exports = router;
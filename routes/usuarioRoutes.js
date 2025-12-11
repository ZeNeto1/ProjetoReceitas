const express = require('express');
const router = express.Router(); 
const usuarioController = require('../controllers/usuarioController');

// /usuarios/ (Lista todos)
router.get('/', usuarioController.index);

// /usuarios/salvar (Recebe os dados do form)
router.post('/', usuarioController.store);




// /usuarios/:id (Atualiza os dados do usuário)
router.put('/:id', usuarioController.update);

// /usuarios/:id (Deleta um usuário)
router.delete('/:id', usuarioController.destroy);

// /usuarios/novo (Mostra o formulário)
router.get('/novo', usuarioController.create);

// /usuarios/:id (Mostra detalhes de um usuário)
router.get('/:id/editar', usuarioController.edit);

module.exports = router;
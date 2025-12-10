// routes/receitaRoutes.js
const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

router.get('/', receitaController.index);
router.get('/nova', receitaController.create);
router.post('/salvar', receitaController.store);

module.exports = router;
const express = require('express');
const app = express();
const db = require('./config/database'); // Conexão
const path = require('path');


const { Usuario, Receita, Avaliacao } = require('./models/Associacoes');

// --- CONFIGURAÇÕES DO EXPRESS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// --- SINCRONISMO COM O BANCO ---
db.sync({ force: false }) 
    .then(() => {
        console.log('Banco conectado e sincronizado!');
    })
    .catch(err => console.error('Erro:', err));

// Rota teste
app.get('/', (req, res) => {
    res.send('<h1>Servidor Rodando Organizado!</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
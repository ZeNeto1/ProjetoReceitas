const express = require('express');
const app = express();
const db = require('./config/database'); // Conexão com o banco de dados
const path = require('path');
const methodOverride = require('method-override');

const usuarioRoutes = require('./routes/usuarioRoutes');
const receitaRoutes = require('./routes/receitaRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// TEMPORARIO
const { Usuario, Receita, Avaliacao } = require('./models/Associacoes');

// --- CONFIGURAÇÕES DO EXPRESS ---
app.set('view engine', 'ejs'); // Define EJS como template engine
app.set('views', path.join(__dirname, 'views')); // Pasta onde ficam os arquivos .ejs
app.use(express.static(path.join(__dirname, 'public'))); // Pasta onde ficam os arquivos .ejs
app.use(methodOverride('_method')); // Suporta ?_method=PUT
app.use(express.urlencoded({ extended: true })); // Parse de formulários

// --- ROTAS ---
app.use('/usuarios', usuarioRoutes);
app.use('/receitas', receitaRoutes);
app.use('/avaliacoes', avaliacaoRoutes);


// --- SINCRONISMO COM O BANCO ---
db.sync({ force: false }) 
    .then(() => {
        console.log('Banco conectado e sincronizado!');
    })
    .catch(err => console.error('Erro:', err));

// Rota base para tela de início
// app.get('/', (req, res) => {
//     return res.render('home/index');
// });

// TEMPORARIO
// Rota base para tela de início
app.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const receitas = await Receita.findAll({ include: Usuario });
        const avaliacoes = await Avaliacao.findAll({ include: [Usuario, Receita] });
        
        return res.render('home/index', { usuarios, receitas, avaliacoes });
    } catch (err) {
        console.error(err);
        return res.render('home/index', { usuarios: [], receitas: [], avaliacoes: [] });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
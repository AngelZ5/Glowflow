require('dotenv').config({ path: require('path').join(process.cwd(), '.env') });

const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const rotasAgendamento = require("../routes/agendamentos");

const app = express();

app.use(cors()); 
app.use(express.json());

// Ativa o prefixo das rotas
app.use('/api/agendamentos', rotasAgendamento); 

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

//// ⬆️ made by https://github.com/kamikazedojapan refactored by https://github.com/AngelZ5
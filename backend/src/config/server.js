require('dotenv').config({ path: require('path').join(process.cwd(), '.env') });

const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const app = express();

app.use(cors()); 
app.use(express.json());


connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
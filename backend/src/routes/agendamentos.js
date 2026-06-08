const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento');

// ROTA 1: Salvar novo agendamento (POST)
router.post('/', async (req, res) => {
    try {
        const novoAgendamento = new Agendamento(req.body);
        const agendamentoSalvo = await novoAgendamento.save();
        
        // Aqui está o segredo: devolvemos o objeto salvo pro Frontend criar o card!
        res.status(201).json(agendamentoSalvo);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// ROTA 2: Buscar todos os agendamentos pra listar na tela (GET)
router.get('/', async (req, res) => {
    try {
        const agendamentos = await Agendamento.find().sort({ criadoEm: -1 });
        res.json(agendamentos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ROTA 3: Deletar um agendamento (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const agendamentoDeletado = await Agendamento.findByIdAndDelete(req.params.id);
        if (!agendamentoDeletado) {
            return res.status(404).json({ erro: 'Agendamento não encontrado' });
        }
        res.json({ mensagem: 'Agendamento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
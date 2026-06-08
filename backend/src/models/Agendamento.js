const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    nomeCliente: { type: String, required: true },
    servico: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    status: { type: String, default: 'Pendente' },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
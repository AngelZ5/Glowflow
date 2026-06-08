// Função que roda quando clica em enviar o formulário
async function criarAgendamento(dadosFormulario) {
    const resposta = await fetch('http://localhost:3000/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormulario)
    });

    // Corrigido aqui: mudamos de 'reply.json()' para 'resposta.json()'
    const agendamentoCriado = await resposta.json();

    // 1. Mudamos o ID do container para a sua classe real (.cards-container)
    const container = document.querySelector('.cards-container');
    
    // 2. Substituímos a estrutura genérica pelo seu HTML estilizado com as classes certas
    container.innerHTML += `
        <div class="card" id="${agendamentoCriado._id}">
            <div class="card-date">${agendamentoCriado.data} <span class="card-time">${agendamentoCriado.horario}</span></div>
            <div class="card-patient">Paciente - ${agendamentoCriado.nomeCliente}</div>
            <div class="card-procedure">${agendamentoCriado.servico}</div>  
            <div class="card-clock-icon"></div>
        </div>
    `;
}

// Função para exibir o modal e o fundo escuro
function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

// Função para esconder o modal e limpar os dados digitados
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    
    // Limpa os campos do formulário para o próximo uso
    document.getElementById('input-nome').value = '';
    document.getElementById('input-cpf').value = '';
    document.getElementById('input-telefone').value = '';
    document.getElementById('input-procedimento').value = '';
    document.getElementById('input-data').value = '';
}
//// ⬆️ made by https://github.com/enzoalbertoamparoferreira-design refactored by https://github.com/AngelZ5

// Função para atualizar o relógio
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    document.getElementById('fixed-clock').textContent = `${horas}:${minutos}`;
}

// Atualiza o relógio imediatamente e a cada segundo
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

//Funcionalidade principal do sistema, responsavel por ordenar os cards pela data mais proxima
// utilizei nested functions
function closerDate() {
    const container = document.querySelector('.cards-container'); // seleciona o container dos cards
    const cards = Array.from(document.getElementsByClassName('card')); // Transforma os cards em um array, acredito que essa seja a forma mais facil de realizar essa organização

    // Função para converter data/hora do formato brasileiro para Date object
    function converterDataBR(texto) {
        // Formato esperado: "DD/MM/YYYY HH:MMH"
        const match = texto.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})H/); // Regex para extrair os grupos de data e hora
        if (match) {
            const [, dia, mes, ano, hora, minuto] = match; // Desestruturação para pegar os grupos extraídos a primeira virgula que apliquei serve para ignorar o match completo
            return new Date(ano, mes - 1, dia, hora, minuto); //  objeto Date com os valores extraídos (obs: mes - 1 pois janeiro no objeto Date começa em 0)
        }   
        return new Date(0); // esse comentario vai ser longo, mas achei interessante aplicar a explicação aqui do por que retornei uma data minima, basicamente o new Date(0) cria uma data padrão conhecida como "Era Unix", que equivale ao dia 1º de Janeiro de 1970. É uma forma do código não quebrar e avisar que aquela data é inválida.
    }

    // Ordena os cards por data e hora
    cards.sort((cardA, cardB) => {
        const dateElementA = cardA.querySelector('.card-date');
        const dateElementB = cardB.querySelector('.card-date');
        
        const dataA = converterDataBR(dateElementA.textContent.trim());
        const dataB = converterDataBR(dateElementB.textContent.trim());

        return dataA - dataB;
    });

    // coloca os cards na ordem certa
    cards.forEach(card => {
        if (container) {
            container.appendChild(card);
        }
    });
}

document.addEventListener("DOMContentLoaded", closerDate);

// Função que roda quando clica em enviar o formulário
async function criarAgendamento() {
    console.log("🔥 BOTÃO CLICADO! Entrou na função criarAgendamento");

    // 1. Pega os valores direto dos inputs do seu HTML
    const nome = document.getElementById('input-nome').value;
    const procedimento = document.getElementById('input-procedimento').value;
    const dataHoraRaw = document.getElementById('input-data').value; // Formato nativo: YYYY-MM-DDTHH:MM

    // Validação simples para não enviar dados vazios
    if (!nome || !procedimento || !dataHoraRaw) {
        alert("⚠️ Por favor, preencha Nome, Procedimento e Data/Hora!");
        return;
    }

    // 2. Trata a data e hora para o padrão BR ("DD/MM/YYYY" e "HH:MMH") que seu CSS e sua função closerDate usam
    const [dataCompleta, horaCompleta] = dataHoraRaw.split('T');
    const [ano, mes, dia] = dataCompleta.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const horaFormatada = `${horaCompleta}H`;

    // Monta o objeto com os nomes de propriedades que seu Back-end/MongoDB espera
    const dadosFormulario = {
        nomeCliente: nome,
        servico: procedimento,
        data: dataFormatada,
        horario: horaFormatada
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosFormulario)
        });

        // Corrigido aqui: mudamos de 'reply.json()' para 'resposta.json()'
        const agendamentoCriado = await resposta.json();

        // 1. Mudamos o ID do container para a sua classe real (.cards-container)
        const container = document.querySelector('.cards-container');
        
        // 2. Substituímos a estrutura genérica pelo seu HTML estilizado com as classes certas
        container.innerHTML += `
            <div class="card" id="${agendamentoCriado._id}">
                <div class="card-date">${agendamentoCriado.data} <span class="card-time">${agendamentoCriado.horario}</span></div>
                <div class="card-patient">Paciente - ${agendamentoCriado.nomeCliente}</div>
                <div class="card-procedure">${agendamentoCriado.servico}</div>  
                <button class="btn-delete" onclick="deletarAgendamento('${agendamentoCriado._id}')">🗑️</button>
            </div>
        `;

        // Executa a sua ordenação de datas para o card novo ir direto para a posição certa
        closerDate();

        // Fecha o modal e limpa os inputs chamando a sua função existente
        fecharModal();

    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);
        alert("Erro ao salvar no banco de dados. O Back-end está ligado?");
    }
}

// Função nova para buscar os agendamentos do banco de dados ao carregar a página
async function carregarAgendamentosDoBanco() {
    try {
        console.log("📥 Buscando agendamentos salvos no MongoDB...");
        const resposta = await fetch('http://localhost:3000/api/agendamentos');
        
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar dados: ${resposta.status}`);
        }

        const agendamentos = await resposta.json();
        const container = document.querySelector('.cards-container');

        // Loop para ler cada agendamento trazido do banco e criar o HTML dele
        agendamentos.forEach(agendamento => {
            container.innerHTML += `
                <div class="card" id="${agendamento._id}">
                    <div class="card-date">${agendamento.data} <span class="card-time">${agendamento.horario}</span></div>
                    <div class="card-patient">Paciente - ${agendamento.nomeCliente}</div>
                    <div class="card-procedure">${agendamento.servico}</div>  
                    <button class="btn-delete" onclick="deletarAgendamento('${agendamento._id}')">🗑️</button>
                </div>
            `;
        });

        // Executa a sua função de ordenação para organizar tudo por data
        closerDate();

    } catch (error) {
        console.error("❌ Erro ao carregar dados iniciais:", error);
    }
}

// Função para deletar um agendamento
async function deletarAgendamento(id) {
    if (!confirm('Tem certeza que deseja deletar este agendamento?')) {
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/api/agendamentos/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            // Remove o card do DOM
            const card = document.getElementById(id);
            if (card) {
                card.remove();
            }
        } else {
            alert('Erro ao deletar agendamento');
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao conectar com o servidor');
    }
}

// Escuta o carregamento da página para puxar os dados do banco automaticamente
document.addEventListener("DOMContentLoaded", carregarAgendamentosDoBanco);
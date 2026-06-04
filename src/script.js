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
    document.getElementById('input-telefone').value = '';
    document.getElementById('input-procedimento').value = '';
    document.getElementById('input-data').value = '';
}
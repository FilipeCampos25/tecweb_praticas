// Script básico - sem funcionalidades extras

// Array para armazenar os grupos (dados da sessão atual)
var grupos = [];

// Função para renderizar os grupos na listagem
function renderGrupos() {
    var container = document.getElementById('grupos-container');
    if (!container) return; // Só executa se estiver na página de listagem

    container.innerHTML = ''; // Limpa o conteúdo anterior

    if (grupos.length === 0) {
        container.innerHTML = '<p>Nenhum grupo cadastrado</p>';
        return;
    }

    grupos.forEach(function(grupo) {
        var card = document.createElement('div');
        card.className = 'card';

        var nome = document.createElement('h3');
        nome.textContent = 'Nome: ' + grupo.nome;

        var quantidade = document.createElement('p');
        quantidade.textContent = 'Quantidade de integrantes: ' + grupo.integrantes.length;

        var lider = document.createElement('p');
        lider.textContent = 'Líder: ' + grupo.lider;

        card.appendChild(nome);
        card.appendChild(quantidade);
        card.appendChild(lider);

        container.appendChild(card);
    });
}

// Chama renderGrupos quando a página carrega, se estiver na listagem
document.addEventListener('DOMContentLoaded', function() {
    renderGrupos();
});
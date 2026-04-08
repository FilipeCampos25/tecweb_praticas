var STORAGE_KEY = 'grupos';
var grupos = [];

function carregarGrupos() {
    try {
        var dadosSalvos = localStorage.getItem(STORAGE_KEY);

        if (!dadosSalvos) {
            return [];
        }

        var gruposSalvos = JSON.parse(dadosSalvos);

        if (!Array.isArray(gruposSalvos)) {
            return [];
        }

        return gruposSalvos
            .map(normalizarGrupo)
            .filter(function(grupo) {
                return grupo !== null;
            });
    } catch (error) {
        console.error('N\u00e3o foi poss\u00edvel carregar os grupos salvos.', error);
        return [];
    }
}

function salvarGrupos() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(grupos));
    } catch (error) {
        console.error('N\u00e3o foi poss\u00edvel salvar os grupos.', error);
    }
}

function obterQuantidadeIntegrantes(grupo) {
    if (grupo.quantidadeIntegrantes !== undefined && grupo.quantidadeIntegrantes !== null) {
        var quantidadeSalva = Number(grupo.quantidadeIntegrantes);

        if (Number.isFinite(quantidadeSalva)) {
            return quantidadeSalva;
        }
    }

    if (Array.isArray(grupo.integrantes)) {
        return grupo.integrantes.length;
    }

    var quantidade = Number(grupo.integrantes);
    return Number.isFinite(quantidade) ? quantidade : 0;
}

function normalizarGrupo(grupo) {
    if (!grupo || typeof grupo !== 'object') {
        return null;
    }

    var quantidadeIntegrantes = obterQuantidadeIntegrantes(grupo);

    return {
        nome: String(grupo.nome || '').trim(),
        quantidadeIntegrantes: quantidadeIntegrantes > 0 ? quantidadeIntegrantes : 0,
        lider: String(grupo.lider || '').trim()
    };
}

function renderGrupos() {
    var container = document.getElementById('grupos-container');

    if (!container) {
        return;
    }

    container.innerHTML = '';

    if (grupos.length === 0) {
        container.innerHTML = '<div class="empty-state">Nenhum grupo cadastrado at&eacute; o momento.</div>';
        return;
    }

    grupos.forEach(function(grupo) {
        var card = document.createElement('article');
        card.className = 'card';

        var nome = document.createElement('h3');
        nome.textContent = grupo.nome;

        var quantidade = document.createElement('p');
        quantidade.textContent = 'Integrantes: ' + grupo.quantidadeIntegrantes;

        var lider = document.createElement('p');
        lider.textContent = 'L\u00edder: ' + grupo.lider;

        card.appendChild(nome);
        card.appendChild(quantidade);
        card.appendChild(lider);

        container.appendChild(card);
    });
}

function limparErros() {
    var erros = document.querySelectorAll('.error');

    erros.forEach(function(elemento) {
        elemento.textContent = '';
    });
}

function exibirErro(campo, mensagem) {
    var elemento = document.getElementById('error-' + campo);

    if (elemento) {
        elemento.textContent = mensagem;
    }
}

function atualizarFeedback(mensagem, tipo) {
    var feedback = document.getElementById('form-feedback');

    if (!feedback) {
        return;
    }

    feedback.textContent = mensagem || '';
    feedback.className = tipo ? 'form-feedback ' + tipo : 'form-feedback';
}

function validarGrupo(grupo) {
    var valido = true;

    if (!grupo.nome) {
        exibirErro('nome', 'Informe o nome do grupo.');
        valido = false;
    }

    if (!Number.isInteger(grupo.quantidadeIntegrantes) || grupo.quantidadeIntegrantes < 1) {
        exibirErro('integrantes', 'Informe uma quantidade v\u00e1lida.');
        valido = false;
    }

    if (!grupo.lider) {
        exibirErro('lider', 'Informe o nome do l\u00edder.');
        valido = false;
    }

    return valido;
}

function configurarFormulario() {
    var formulario = document.getElementById('cadastro-form');

    if (!formulario) {
        return;
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        limparErros();
        atualizarFeedback('', '');

        var novoGrupo = {
            nome: document.getElementById('nome').value.trim(),
            quantidadeIntegrantes: Number(document.getElementById('integrantes').value),
            lider: document.getElementById('lider').value.trim()
        };

        if (!validarGrupo(novoGrupo)) {
            atualizarFeedback('Revise os campos destacados.', 'error');
            return;
        }

        grupos.push(novoGrupo);
        salvarGrupos();
        formulario.reset();
        atualizarFeedback('Grupo salvo com sucesso no navegador.', 'success');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    grupos = carregarGrupos();
    configurarFormulario();
    renderGrupos();
});

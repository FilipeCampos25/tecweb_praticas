let grupos = [];

const form = document.getElementById('cadastro-form');
const nomeInput = document.getElementById('nome');
const integrantesInput = document.getElementById('integrantes');
const liderInput = document.getElementById('lider');
const errorNome = document.getElementById('error-nome');
const errorIntegrantes = document.getElementById('error-integrantes');
const errorLider = document.getElementById('error-lider');

function limparErros() {
    errorNome.textContent = '';
    errorIntegrantes.textContent = '';
    errorLider.textContent = '';
}

function validarFormulario() {
    let valido = true;
    const nome = nomeInput.value.trim();
    const integrantes = Number(integrantesInput.value);
    const lider = liderInput.value.trim();

    if (!nome) {
        errorNome.textContent = 'Campo obrigatório';
        valido = false;
    }

    if (!integrantesInput.value || integrantes <= 0) {
        errorIntegrantes.textContent = 'Informe uma quantidade maior que zero';
        valido = false;
    }

    if (!lider) {
        errorLider.textContent = 'Campo obrigatório';
        valido = false;
    }

    return valido;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    limparErros();

    if (!validarFormulario()) {
        return;
    }

    const grupo = {
        nome: nomeInput.value.trim(),
        integrantes: Number(integrantesInput.value),
        lider: liderInput.value.trim()
    };

    grupos.push(grupo);
    form.reset();
});
// ESTRUTURA DE SESSÕES 
document.getElementById('start-game').addEventListener('click', () => {
    showPhase(1);
});

function showPhase(phaseNumber) {
    document.querySelectorAll('.view').forEach(view => view.style.display = 'none');
    document.getElementById(`phase${phaseNumber}`).style.display = 'block';
}

function showHome() {
    document.querySelectorAll('.view').forEach(view => view.style.display = 'none');
    document.getElementById('home').style.display = 'block';
}

// Inicializa mostrando a página inicial
showHome();

// MECÂNICA DO JOGO 
let linhaAtual = 1;
let colunaAtual = 1;

// Função para adicionar comandos ao textarea
function adicionarComando(comando) {
    const codigoArea = document.getElementById('codigo');
    codigoArea.value += comando + '\n'; // Adiciona o comando em uma nova linha
}

// Função para atualizar a posição do jogador
function atualizarPosicao() {
    const jogador = document.getElementById('jogador');
    jogador.style.top = `${(linhaAtual - 1) * 120}px`;
    jogador.style.left = `${(colunaAtual - 1) * 120}px`;
}

// Funções de movimento
function moveFoward() {
    if (linhaAtual > 1) { // Move para cima
        linhaAtual--;
        atualizarPosicao();
    }
}

function moverEsquerda() {
    if (colunaAtual > 1) { // Move para esquerda
        colunaAtual--;
        atualizarPosicao();
    }
}

function moverDireita() {
    if (colunaAtual < 5) { // Move para direita
        colunaAtual++;
        atualizarPosicao();
    }
}

function moverBaixo() {
    if (linhaAtual < 5) { // Move para baixo
        linhaAtual++;
        atualizarPosicao();
    }
}

// Função para executar os comandos em sequência
function executarComandos() {
    const codigo = document.getElementById('codigo').value;
    const linhas = codigo.split('\n').filter(l => l.trim() !== '');

    // Executa cada comando com atraso, para que seja visualmente perceptível
    linhas.forEach((linha, index) => {
        setTimeout(() => {
            try {
                eval(linha); // Executa o comando
            } catch (e) {
                alert('Erro no comando: ' + linha);
            }
        }, index * 500); // Delay de 500ms entre cada comando
    });
}

// Função para limpar os comandos
function limparComandos() {
    const codigoArea = document.getElementById('codigo');
    codigoArea.value = ''; // Limpa o textarea
}

// Função para reiniciar a posição do jogador
function reiniciarPosicao() {
    linhaAtual = 1;
    colunaAtual = 1;
    atualizarPosicao();
}

function chegouNoFinal() {
    if (jogador.style.top == '150px' && jogador.style.left == '150px') {
        return true;
    } else {
        return false;
    }
}

// Inicializar a posição inicial do jogador
atualizarPosicao();

let linhaAtual = 1;
let colunaAtual = 1;

function atualizarPosicao() {
    const jogador = document.getElementById('jogador');
    jogador.style.top = `${(linhaAtual - 1) * 120}px`;
    jogador.style.left = `${(colunaAtual - 1) * 120}px`;
}

function moverCima() {
    if (linhaAtual > 1) {
        linhaAtual--;
        atualizarPosicao();
    }
}

function moverBaixo() {
    if (linhaAtual < 5) {
        linhaAtual++;
        atualizarPosicao();
    }
}

function moverEsquerda() {
    if (colunaAtual > 1) {
        colunaAtual--;
        atualizarPosicao();
    }
}

function moverDireita() {
    if (colunaAtual < 5) {
        colunaAtual++;
        atualizarPosicao();
    }
}

// Posiciona o jogador na célula inicial ao carregar a página
atualizarPosicao();

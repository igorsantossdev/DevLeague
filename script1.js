let x = 0, y = 0; // Posição inicial da bola no centro do espaço de jogo
const step = 30; // Quantos pixels cada movimento altera a posição
let commandList = []; // Lista para armazenar comandos
let moveCount = 0; // Contador de movimentos
let minMovements = 0; // Movimentos mínimos para alcançar o alvo

function placeTarget() {
    const target = document.getElementById('target');
    const maxPosition = 240; // Limite para a posição do canto superior da área de destino
    const randomX = Math.floor(Math.random() * (maxPosition / step)) * step;
    const randomY = Math.floor(Math.random() * (maxPosition / step)) * step;

    // Define a posição da área de destino com múltiplos de 30px
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    // Calcula a menor quantidade de movimentos para chegar ao alvo
    minMovements = Math.ceil(Math.abs((randomX - x) / step) + Math.abs((randomY - y) / step));
    document.getElementById('min-movements').innerText = `Movimentos Mínimos: ${minMovements}`;
}

function addCommand(direction) {
    commandList.push(direction);
    document.getElementById('commands').innerText += direction + "\n"; // Adiciona comando à lista visual
}

function executeCommands() {
    commandList.forEach((command, index) => {
        setTimeout(() => {
            document.getElementById('current-command').innerText = `Comando Atual: ${command}`;
            move(command);
            if (index === commandList.length - 1) {
                setTimeout(() => {
                    commandList = []; // Limpa a lista de comandos após executar
                    document.getElementById('commands').innerText = ''; // Limpa a visualização de comandos
                    checkWin();
                }, 300);
            }
        }, index * 300); // Executa cada comando com um intervalo de 300ms
    });
}
function move(direction) {
    const ball = document.getElementById('ball');
    switch (direction) {
        case 'moverCima':
            if (y > 0) y -= step;
            ball.src = "costas.png"; // Muda a imagem para "c.jpg" quando move para cima
            break;
        case 'moverBaixo':
            if (y < 270) y += step;
            ball.src = "frente.png"; // Muda a imagem para "b.jpg" quando move para baixo
            break;
        case 'moverEsquerda':
            if (x > 0) x -= step;
            ball.src = "esquerda.png"; // Muda a imagem para "e.jpg" quando move para esquerda
            break;
        case 'moverDireita':
            if (x < 270) x += step;
            ball.src = "direita.png"; // Muda a imagem para "d.jpg" quando move para direita


            break;
    }
    updatePosition();
    moveCount++;
}


function updatePosition() {
    const ball = document.getElementById('ball');
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
}

function checkWin() {
    const target = document.getElementById('target');
    const ball = document.getElementById('ball');

    // Converte as posições para inteiros para comparação
    const ballLeft = parseInt(ball.style.left);
    const ballTop = parseInt(ball.style.top);
    const targetLeft = parseInt(target.style.left);
    const targetTop = parseInt(target.style.top);

    // Verifica se a bola está dentro da área de destino
    if (
        ballLeft >= targetLeft &&
        ballLeft <= targetLeft + 30 && // Verifica dentro da largura da área-alvo
        ballTop >= targetTop &&
        ballTop <= targetTop + 30 // Verifica dentro da altura da área-alvo
    ) {
        let score;
        if (moveCount <= minMovements) {
            score = 3;
        } else if (moveCount <= minMovements * 2) {
            score = 2;
        } else {
            score = 1;
        }
        document.getElementById('score').innerText = `Nota: ${score}`;
        alert(`Você ganhou em ${moveCount} movimentos! Estrelas: ${score}`);
        moveCount = 0; // Reseta o contador de movimentos ao atingir o alvo
        placeTarget(); // Reposiciona a área de destino para um novo jogo
    }
}

window.onload = function() {
    placeTarget();  // Posiciona a área de destino
    const modal = document.getElementById('welcome-modal');
    const modalContent = document.querySelector('.modal-content');

    // Adiciona o evento de clique para fechar o modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(event) {
        if (event.target !== modalContent && !modalContent.contains(event.target)) {
            modal.style.display = 'none';  // Fecha o modal
        }
    });

    // Adiciona o evento de clique ao botão "Começar" para fechar o modal
    document.getElementById('start-button').addEventListener('click', function() {
        modal.style.display = 'none';  // Fecha o modal ao clicar em "Começar"
    });
};

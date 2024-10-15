
let x = 0;
let y = 0; 
let tentativas = 5;
let gols = 0;

function coordenadasx(vx) {
    x = vx;
    document.getElementById("scorex").innerText = "eixo X: " + x
}

function coordenadasy(vy) {
    y = vy;
    document.getElementById("scorey").innerText = "eixo Y: " + y
}

function moveGoalkeeper() {
    // Define as possíveis coordenadas para a posição do goleiro
    const positions = [
        { top: '5%', left: '35%' },  // Canto superior esquerdo
        { top: '5%', left: '65%' },  // Canto superior direito
        { top: '18%', left: '35%' }, // Canto inferior esquerdo
        { top: '18%', left: '65%' }  // Canto inferior direito
    ];

    // Escolhe aleatoriamente um índice entre 0 e 3
    const randomIndex = Math.floor(Math.random() * positions.length);

    // Pega as coordenadas aleatórias
    const newPosition = positions[randomIndex];

    // Atualiza a posição do goleiro no campo
    const goalkeeper = document.getElementById('goalkeeper');
    goalkeeper.style.top = newPosition.top;
    goalkeeper.style.left = newPosition.left;
}

function executeCommands() {
    moveGoalkeeper();
    let ball = document.getElementById("ball");
    if (x == 1 && y == 1) { 
        ball.style.left = "65%"
        ball.style.top = "5%"
    }

    else if (x == -1 && y == 1) {
        ball.style.left = "35%"
        ball.style.top = "5%"


    }
    else if (x == -1 && y == -1) {
        ball.style.left = "35%"
        ball.style.top = "18%"

    }
    else if (x == 1 && y == -1) {
        ball.style.left = "65%"
        ball.style.top = "18%"


    }
    defense();
    resetposition();
    checkWin();
}

function defense() {
    if (ball.style.left == goalkeeper.style.left && ball.style.top == goalkeeper.style.top){
        
        setTimeout(function() {
            alert("Defesa!");
            document.getElementById("gols").innerText = "X"
            tentativas --; 
            document.getElementById("tentativas").innerText = "tentativas: " + tentativas ;
        }, 700);

    } else { 
        setTimeout(function() {
            alert("gol!");
            document.getElementById("gols").innerText = "O";
            gols++;
            tentativas --; 
            document.getElementById("gols-feitos").innerText = "gols: " + gols;
            document.getElementById("tentativas").innerText = "tentativas: " + tentativas;

        }, 700);
        }

}

function resetposition() {

    setTimeout(function() {
        ball.style.left = "50%";
        ball.style.top = "50%";
        goalkeeper.style.left = "50%";
        goalkeeper.style.top = "calc(0% + 10%)";    
    }, 800);    
}

function checkWin() {
    if (tentativas == 1) {
        if (gols >= 3) { 
            setTimeout(function() {
                alert("fim de jogo! você venceu!");
                resetInfo();
            }, 1000);

        } else {
            setTimeout(function() {
                alert("fim de jogo! você perdeu!");
                resetInfo();
            }, 1000)
        }
    }
}

function resetInfo() { 
    gols = 0;
    document.getElementById("gols-feitos").innerText = "gols: " + gols
    tentativas = 5;
    document.getElementById("tentativas").innerText = "tentativas: " + tentativas
}

window.onload = function() {
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
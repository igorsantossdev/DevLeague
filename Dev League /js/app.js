// Exemplo de manipulação com JS se necessário
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        alert('Você clicou em uma célula!');
    });
});

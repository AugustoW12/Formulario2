// Função para formatar a data e hora atuais como YYYY-MM-DD
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`; // Corrigido para YYYY-MM-DD
}

// Define a data e hora atuais no campo oculto
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('currentDateTime').value = getCurrentDateTime();
});

let firstClick = true;

function reloadPageAfterDelay(){
    setTimeout(() => {
        location.reload();
    }, 3500); // Espera 3,5 segundos antes de recarregar 
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    document.getElementById('currentDateTime').value = getCurrentDateTime();

    // Coleta os dados do formulário
    const formData = new FormData(event.target);

    // Transforma os dados em um objeto para facilitar a manipulação
    let data = {};
    formData.forEach((value, key) => {
        // Converte os valores dos inputs de faixa para números flutuantes
        if (key.startsWith('aparencia') || key.startsWith('odor') || key.startsWith('sabor') || key.startsWith('textura')) {
            data[key] = parseFloat(value);
        } else {
            data[key] = value;
        }
    });

    // Mostra o alerta apenas na primeira vez que o formulário for enviado
    if (firstClick) {
        alert('Sua resposta foi registrada :)');
        firstClick = false;
    }

    fetch('https://api.sheetmonkey.io/form/kyTJqgwZp2k1Af4KJ191iZ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Limpa os campos do formulário após o envio
    event.target.reset();

    // Restaura o valor do campo currentDateTime
    document.getElementById('currentDateTime').value = getCurrentDateTime();


    // Se quiser recarregar a página após o envio, descomente a linha

});

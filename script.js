// Função para formatar a data e hora atuais como YYYY-MM-DD HH:MM:SS
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year}`;// ${hours}:${minutes}:${seconds}`;
}

// Define a data e hora atuais no campo oculto
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('currentDateTime').value = getCurrentDateTime();
});

let firstClick = true;


// Adiciona um evento de clique ao botão para mostrar um alerta
document.querySelector('button[type="submit"]').addEventListener('click', function() {
    alert('Sua resposta foi registrada :)');
    setTimeout(function() {
        location.reload(); // ou use window.location.href = 'URL' para redirecionar
    }, 5000); // 5000 ms = 5 segundos
});

  
document.getElementById('currentDateTime').value = getCurrentDateTime();
const data = {};
const form = document.getElementById('dataForm');
form.addEventListener('submit', handleSubmit);


function handleSubmit(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const formData = new FormData(event.target);
    
    // Lista dos campos tipo range
    const rangeFields = [
        'aparencia1', 'odor1', 'sabor1', 'textura1',
        'aparencia2', 'odor2', 'sabor2', 'textura2'
    ];
    
    // Transforma os dados em um objeto para facilitar a manipulação
    let data = {};
    
    rangeFields.forEach(field => {
        data[field] = 0;
    });
    
    formData.forEach((value, key) => {
        // Converte os valores dos inputs de faixa para números flutuantes
        if (rangeFields.includes(key)) {
            // Envia sempre como sring, inclusive 0
            data[key] = value === "" ? "0" : value.toString();
        } else {
            data[key] = value;
        }
    });
    
    // console.log(data);

    fetch('https://api.sheetmonkey.io/form/kyTJqgwZp2k1Af4KJ191iZ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    })
    
}




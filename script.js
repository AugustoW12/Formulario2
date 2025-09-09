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





document.getElementById('dataForm').addEventListener('submit', function(event) { //document.addEventListener('DOMContentLoaded', function() {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    document.getElementById('currentDateTime').value = getCurrentDateTime();
    const data = {};
    const form = document.getElementById('dataForm');
    form.addEventListener('submit', handleSubmit);


    function handleSubmit(event) {
        event.preventDefault();

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


    // Adiciona um evento de clique ao botão para mostrar um alerta
    document.querySelector('button[type="submit"]').addEventListener('click', function() {
        alert('Sua resposta foi registrada :)');
    });




        fetch('https://api.sheetmonkey.io/form/kyTJqgwZp2k1Af4KJ191iZ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        
    }
});



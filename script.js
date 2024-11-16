async function search() {
    const cnpj = document.getElementById('input-field').value.trim();

    if (!cnpj || isNaN(cnpj) || cnpj.length !== 14) {
        alert('Por favor, insira um CNPJ válido com 14 números.');
        return;
    }

    const apiUrl = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayResult(data);
        } else {
            alert('Erro ao consultar a API. Verifique o CNPJ e tente novamente.');
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        alert('Ocorreu um erro ao consultar a API.');
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Resultado da Consulta:</h3>
        <p><strong>Nome:</strong> ${data.nome || 'Não disponível'}</p>
        <p><strong>Atividade Principal:</strong> ${data.atividade_principal?.[0]?.text || 'Não disponível'}</p>
        <p><strong>UF:</strong> ${data.uf || 'Não disponível'}</p>
        <p><strong>Status:</strong> ${data.status || 'Não disponível'}</p>
        <p><strong>Telefone:</strong> ${data.telefone || 'Não disponível'}</p>
        <p><strong>Capital Social:</strong> R$ ${data.capital_social || 'Não disponível'}</p>
    `;
}
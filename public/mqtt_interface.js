function fetchMessagesAndUpdate() {
    fetch('/messages')
        .then(response => response.json())
        .then(messages => {
            const messagesContainer = document.getElementById('messages');
            messages.forEach(message => {
                // Verifica se a mensagem já foi exibida na tela
                if (!document.querySelector(`[data-id="${message.Id}"]`)) {
                    // Crie um novo elemento de mensagem e adicione-o ao contêiner de mensagens
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    messageElement.dataset.id = message.Id; // Acessa o campo Id
                    messageElement.innerHTML = `
                        <p><strong>Id:</strong> ${message.Id}</p>
                        <p><strong>Placa:</strong> ${message.Placa}</p>
                        <p><strong>Operacional:</strong> <span class="${message.Operacional === 1 ? 'green-dot' : message.Operacional === 0 ? 'red-dot' : ''}" data-number="${message.Operacional}"</span></p>
                        <p><strong>Localizacao:</strong> ${message.Localizacao}</p>
                        <p><strong>Conectividade:</strong> <span class="${message.Conectividade === 1 ? 'blue-dot' : message.Conectividade === 0 ? 'red-dot' : ''}" data-number="${message.Conectividade}"</span></p>
                        <p><strong>Temperatura:</strong> ${message.Temperatura}</p>
                        <p><strong>Luminosidade:</strong> ${message.Luminosidade}</p>
                        <p><strong>Data de Inclusao:</strong> ${message.DataDeInclusao}</p>
                    `;
                    messagesContainer.appendChild(messageElement);
                }
            });
        })
        .catch(error => console.error('Erro ao ler as mensagens:', error));
}

// Atualiza as mensagens a cada 2 segundos
setInterval(fetchMessagesAndUpdate, 2000);

// Chama a função fetchMessagesAndUpdate assim que a página for carregada
window.onload = fetchMessagesAndUpdate;
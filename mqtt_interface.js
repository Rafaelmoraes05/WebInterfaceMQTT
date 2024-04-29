function fetchMessagesAndUpdate() {
    fetch('messagemqtt.json')
      .then(response => response.json())
      .then(messages => {
        const messagesContainer = document.getElementById('messages');
        messages.forEach(message => {
          // Verifica se a mensagem já foi exibida na tela
          if (!document.querySelector(`[data-timestamp="${message.timestamp}"]`)) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.dataset.timestamp = message.timestamp;
            messageElement.innerHTML = `
              <p><strong>Timestamp:</strong> ${message.timestamp}</p>
              <p><strong>Topic:</strong> ${message.topic}</p>
              <p><strong>Payload:</strong> ${message.payload}</p>
            `;
            messagesContainer.appendChild(messageElement);
          }
        });
      })
      .catch(error => console.error('Erro ao ler o arquivo:', error));
  }
  
  // Atualiza as mensagens a cada 2 segundos
  setInterval(fetchMessagesAndUpdate, 2000);
  
  // Chama a função fetchMessagesAndUpdate assim que a página for carregada
  window.onload = fetchMessagesAndUpdate;
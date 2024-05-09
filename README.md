# Interface WEB MQTT

## Descrição
Uma aplicação que exibe mensagens MQTT recebidas e armazenadas em um banco de dados SQLite. Ele fornece uma interface web para visualização das mensagens, permitindo aos usuários monitorar e analisar os dados provenientes de dispositivos IoT.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado o seguinte:
- [Node.js](https://nodejs.org/) (v12 ou superior)
- [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [SQLite](https://www.sqlite.org/) (opcional se já tiver um banco de dados SQLite configurado)
- [Python](https://www.python.org/downloads/) (v3.12)
- [PIP](https://pip.pypa.io/en/stable/cli/pip_install/) (geralmente instalado junto com o Python)


## Instalação dos Módulos
1. Clone este repositório em sua máquina local:
   
   ```bash
   git clone https://github.com/seu-usuario/WebInterfaceMQTT.git

2. Navegue até o diretório do projeto:
   
   ```bash
   cd WebInterfaceMQTT

3. Instale as dependências do Node.js utilizando o npm:
   
   ```bash
   npm install
Este comando irá instalar todas as dependências necessárias listadas no arquivo package.json, incluindo o Express e o sqlite3.

4. Instale a biblioteca paho-mqtt para poder executar o script Python:

   ```bash
   pip install paho-mqtt==1.5.1

## Como Executar

Feita toda a instalação você irá seguir os seguintes passos:

1. Abra um terminal no diretório do projeto e execute o script Python para fazer a conexão com o servidor mqtt:

   ```bash
   python mqtt_subscriber.py
Após executado, ele irá imprimir a seguinte mensagem: Connected to MQTT Broker! Isso indica que a conexão foi bem sucedida. 

Não feche ou pare a execução, pois ele irá receber as mensagens do servidor e automaticamente irá gerar uma arquivo chamado: 'messagemqtt.json'.

Aqui você estará recebendo as mensagens em tempo real no formato de JSON.

2. Abra outro terminal, dessa vez iremos armazenar as mensagens do arquivo 'messagemqtt.json' em um banco de dados chamado: estacao.db, para isso execute o seguinte comando em um NOVO terminal:
 
   ```bash
   node processMessage.js    
Mais uma vez, não feche o terminal, deixe rodando.

Aqui o script criará um banco de dados sqlite chamado 'estacao.db'. E após isso ele irá ler, processar e armazenar as mensagens a cada 1 segundo.

3. Abra outro terminal e desta vez execute o server da nossa aplicação:
  
   ```bash
   node mqtt_server.js    
Mais uma vez, não feche o terminal, deixe rodando.

Isso iniciará o servidor, que estará pronto para receber requisições na porta padrão 3000. Você pode acessar a aplicação em seu navegador web utilizando o seguinte endereço:
  
  ```bash
  http://localhost:3000


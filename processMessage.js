const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Abrir a conexão com o banco de dados
const db = new sqlite3.Database('estacao.db');

// Cria a tabela Estacao se ela não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Estacao (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Placa TEXT,
        Operacional BOOLEAN,
        Localizacao TEXT,
        Conectividade BOOLEAN,
        Temperatura REAL,
        Luminosidade REAL,
        DataDeInclusao TEXT UNIQUE
    )`);
});

// Função para inserir dados na tabela Estacao
function insertData(placa, operacional, localizacao, conectividade, temperatura, luminosidade, timestamp) {
    db.run(
        'INSERT INTO Estacao (Placa, Operacional, Localizacao, Conectividade, Temperatura, Luminosidade, DataDeInclusao) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [placa, operacional, localizacao, conectividade, temperatura, luminosidade, timestamp],
        function(err) {
            if (err) {
                console.error('Erro ao inserir dados:', err.message);
            } else {
                console.log('Dados inseridos com sucesso!');
            }
        }
    );
}

// Função para verificar se uma mensagem já foi processada
function checkIfMessageProcessed(timestamp) {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) as count FROM Estacao WHERE DataDeInclusao = ?', [timestamp], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.count > 0);
            }
        });
    });
}

// Função para processar a mensagem JSON e inserir os dados na tabela
async function processMessage(message) {
    if (!message || !message.timestamp || !message.payload) {
        console.error('Erro ao processar o JSON: As propriedades necessárias não estão presentes');
        return;
    }

    const { timestamp, payload } = message;
    const [placa, operacional, localizacao, conectividade, temperatura, luminosidade] = payload.split(', ');

    // Verificar se a mensagem já foi processada
    const processed = await checkIfMessageProcessed(timestamp);
    if (!processed) {
        // Se a mensagem ainda não foi processada, inserir os dados no banco de dados
        insertData(placa, operacional === 'TRUE', localizacao, conectividade === 'TRUE', parseFloat(temperatura), parseFloat(luminosidade), timestamp);
        console.log('Mensagem Adicionada!');
    } else {
        console.log('..');
    }
}

// Função para ler o arquivo JSON e processar as mensagens
function readAndProcessMessages() {
    fs.readFile('messagemqtt.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        try {
            // Converter o conteúdo do arquivo para objeto JSON
            const data = JSON.parse(jsonString);
            // Chamar a função para processar cada mensagem
            data.forEach(processMessage);
        } catch (err) {
            console.error('Erro ao processar o JSON:', err);
        }
    });
}

// Chamar a função para ler e processar as mensagens repetidamente a cada segundo
setInterval(readAndProcessMessages, 1000);
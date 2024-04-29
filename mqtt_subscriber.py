import json
import random
import time
from datetime import datetime

from paho.mqtt import client as mqtt_client

broker = '18.231.157.55'
port = 1883
topic = "temp/sub"
client_id = f'subscribe-{random.randint(0, 100)}'
username = 'telit'
password = 'telit123'

# Lista para armazenar as mensagens
messages = []

def on_message(client, userdata, msg):
    timestamp = time.time()
    formatted_time = datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    message = {
        "timestamp": formatted_time,
        "topic": msg.topic,
        "payload": msg.payload.decode()
    }
    # Adiciona a mensagem à lista
    messages.append(message)
    # Chama a função para escrever as mensagens no arquivo JSON em tempo real
    write_messages_to_json()

def write_messages_to_json():
    # Escreve todas as mensagens no arquivo JSON em tempo real
    with open('messagemqtt.json', 'w') as file:
        file.write("[\n")
        for i, message in enumerate(messages):
            file.write(json.dumps(message, indent=4))  # Escreve a mensagem com formatação
            if i < len(messages) - 1:
                file.write(",\n")  # Adiciona uma vírgula e uma quebra de linha após cada mensagem, exceto a última
            else:
                file.write('\n')  # Adiciona uma quebra de linha após a última mensagem
        file.write("]\n")

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(broker, port)
    return client

def subscribe(client: mqtt_client):
    client.subscribe(topic)

def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()

if __name__ == '__main__':
    run()
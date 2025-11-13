from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/dados', methods=['POST'])
def receber_dados():
    dados = request.json
    temperatura = dados.get('temperatura')
    vazamento = dados.get('vazamento')

    print(f"🌡 Temperatura: {temperatura} °C")
    print(f"💧 Vazamento: {'DETECTADO' if vazamento else 'Não detectado'}")
    print('-----------------------------')

    return jsonify({'mensagem': 'Dados recebidos com sucesso!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)  
CORS(app)  

dados = {
    "temperatura": None,
    "vazamento": False
}

@app.route('/dados', methods=['POST'])
def receber_dados():

    global dados
    try:
        conteudo = request.get_json()
        dados["temperatura"] = conteudo.get("temperatura")
        dados["vazamento"] = conteudo.get("vazamento")

        print(f"📡 Dados recebidos: {dados}")
        return jsonify({"status": "ok", "mensagem": "Dados recebidos com sucesso"}), 200

    except Exception as e:
        print(f"❌ Erro ao processar dados: {e}")
        return jsonify({"erro": "Falha ao processar dados"}), 400


@app.route('/dados', methods=['GET'])
def enviar_dados():
    """
    Retorna os últimos dados recebidos para o frontend React.
    Exemplo de resposta:
    {
      "temperatura": 26.5,
      "vazamento": true
    }
    """
    return jsonify(dados)


if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=5000)

import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/dados");
        const data = await res.json();

        const hora = new Date().toLocaleTimeString();
        const novaLeitura = {
          temperatura: data.temperatura,
          vazamento: data.vazamento,
          hora,
        };

        setDados((old) => [...old.slice(-19), novaLeitura]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }, 3000); // busca a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const ultimo = dados[dados.length - 1];
  if (!ultimo) return <h2 style={{ textAlign: "center" }}>Carregando dados...</h2>;

  const corStatus = ultimo.vazamento ? "#1e1e2e" : "#ff4d4d";
  const textoStatus = ultimo.vazamento ? "✅ Sem Vazamento" : "🚨 Vazamento Detectado!";

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#0b0e13",
        color: "#fff",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🚛 Controle de Vazamento - Caminhão Tanque
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: ultimo.temperatura > 35 ? "#ff4d4d" : "#1e1e2e",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          <h2>🌡️ Temperatura</h2>
          <p style={{ fontSize: "32px", margin: 0 }}>
            {ultimo.temperatura.toFixed(1)} °C
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "15px",
            backgroundColor: corStatus,
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          }}
        >
          <h2>🧯 Status</h2>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0,
              animation: ultimo.vazamento
                ? "piscar 1s infinite alternate"
                : "none",
            }}
          >
            {textoStatus}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="hora" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#ff6347"
            name="Temperatura (°C)"
          />
        </LineChart>
      </ResponsiveContainer>

      <style>
        {`
          @keyframes piscar {
            from { opacity: 1; }
            to { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
}

export default App;

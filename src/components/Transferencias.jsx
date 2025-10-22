import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Transferencias() {
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const cliente = JSON.parse(localStorage.getItem("usuario"));

  if (!cliente) {
    navigate("/");
    return null;
  }

  const handleTransferir = async () => {
    try {
      if (!cuentaDestino || !monto) {
        setMensaje("⚠️ Por favor completa todos los campos.");
        return;
      }

      const baseUrl = "http://localhost:3000/api/v1"; // 🔧 cambia si tu backend usa otro puerto
      const cliente = JSON.parse(localStorage.getItem("usuario"));
      const clienteId = cliente.id; // ejemplo: 110
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}/cliente/${clienteId}/transferir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuentaDestino: Number(cuentaDestino),
          monto: Number(monto),
          concepto: concepto || "Transferencia sin concepto",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMensaje(
          `✅ ${data.data.Mensaje}\nMonto: Q${data.data.Monto}\nTransacción: ${data.data.TransaccionID}`
        );
        setCuentaDestino("");
        setMonto("");
        setConcepto("");
      } else {
        setMensaje(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en transferencia:", error);
      setMensaje("❌ Ocurrió un error al realizar la transferencia.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💸 Transferencia Bancaria</h1>

      <div style={styles.infoBox}>
        <p><strong>Cuenta Origen:</strong> {cliente.cuentas?.[0]?.int_cuencodigo}</p>
        <p><strong>Saldo Actual:</strong> Q {cliente.cuentas?.[0]?.dec_cuensaldo?.toFixed(2)}</p>
      </div>

      <input
        type="number"
        placeholder="Cuenta destino"
        value={cuentaDestino}
        onChange={(e) => setCuentaDestino(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Monto a transferir"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Concepto (opcional)"
        value={concepto}
        onChange={(e) => setConcepto(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleTransferir}>
        Transferir
      </button>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      <button style={styles.backButton} onClick={() => navigate("/bienvenida")}>
        ⬅ Volver
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "3rem auto",
    padding: "2rem",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "20px",
    color: "#00bfff",
  },
  infoBox: {
    backgroundColor: "#333",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mensaje: {
    marginTop: "15px",
    whiteSpace: "pre-wrap",
  },
  backButton: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Transferencias;

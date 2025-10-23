import { useState } from "react";
import api from "../services/api";

function CrearCuenta() {
  const [opcion, setOpcion] = useState("cliente");
  const [formData, setFormData] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejo de inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setResultado(null);

    try {
      if (opcion === "cliente") {
        // --- FLUJO CLIENTE ---
        const resCliente = await api.post("/cliente", formData);
        if (resCliente.data.success) {
          const clienteData = resCliente.data.data;

          // Crear cuenta automáticamente
          const cuentaRes = await api.post("/cuenta", {
            monedaId: "01",
            sucursalId: "001",
            empleadoId: 101,
            clienteId: clienteData.clienteId,
            saldoInicial: 100,
          });

          const cuentaData = cuentaRes.data;
          setResultado({
            titulo: "Cliente creado exitosamente",
            usuario: clienteData.usuario,
            clave: clienteData.clave,
            codigoCuenta: cuentaData.CodigoCuenta,
            claveCuenta: cuentaData.Clave,
          });
        } else {
          setMensaje(resCliente.data.message || "Error al crear cliente");
        }
      } else {
        // --- FLUJO NEGOCIO ---
        const resNegocio = await api.post("/negocio", formData);
        if (resNegocio.data.success) {
          const negocioData = resNegocio.data.data;

          // Crear cuenta automáticamente
          const cuentaRes = await api.post("/cuenta", {
            monedaId: "01",
            sucursalId: "001",
            empleadoId: 101,
            negocioId: negocioData.NegocioID,
            saldoInicial: 100,
          });

          const cuentaData = cuentaRes.data;

          setResultado({
            titulo: "Negocio creado exitosamente",
            usuario: negocioData.Usuario,
            clave: negocioData.Clave,
            codigoCuenta: cuentaData.CodigoCuenta,
          });
        } else {
          setMensaje(resNegocio.data.message || "Error al crear negocio");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMensaje(error.response.data.message || "Error del servidor");
      } else {
        setMensaje("No se pudo conectar al servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>🆕 Crear Cuenta</h2>

        {/* Selector */}
        <div style={styles.optionContainer}>
          <button
            style={{
              ...styles.optionButton,
              backgroundColor: opcion === "cliente" ? "#646cff" : "#444",
            }}
            onClick={() => {
              setOpcion("cliente");
              setFormData({});
              setMensaje("");
              setResultado(null);
            }}
          >
            Crear Cliente
          </button>
          <button
            style={{
              ...styles.optionButton,
              backgroundColor: opcion === "negocio" ? "#646cff" : "#444",
            }}
            onClick={() => {
              setOpcion("negocio");
              setFormData({});
              setMensaje("");
              setResultado(null);
            }}
          >
            Crear Negocio
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {opcion === "cliente" ? (
            <>
              <input type="text" name="paterno" placeholder="Apellido paterno" onChange={handleChange} required />
              <input type="text" name="materno" placeholder="Apellido materno" onChange={handleChange} required />
              <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
              <input type="text" name="dni" placeholder="DNI" onChange={handleChange} required />
              <input type="date" name="nacimiento" onChange={handleChange} required />
              <input type="text" name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
              <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required />
              <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
            </>
          ) : (
            <>
              <input type="text" name="nombre" placeholder="Nombre del negocio" onChange={handleChange} required />
              <input type="text" name="nit" placeholder="NIT" onChange={handleChange} required />
              <input type="text" name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
              <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required />
              <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
            </>
          )}

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Procesando..." : "Enviar"}
          </button>
        </form>

        {/* Mensaje de error */}
        {mensaje && (
          <p
            style={{
              marginTop: "1rem",
              color: "#f87171",
              textAlign: "center",
            }}
          >
            {mensaje}
          </p>
        )}

        {/* Resultado visual */}
        {resultado && (
          <div style={styles.resultado}>
            <h3>{resultado.titulo}</h3>
            <div style={styles.infoBox}>
              <p><strong>Usuario:</strong> {resultado.usuario}</p>
              <p><strong>Clave:</strong> {resultado.clave}</p>
              <p><strong>Código de cuenta:</strong> {resultado.codigoCuenta}</p>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
              💡 Guarda esta información, la necesitarás para iniciar sesión.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: "2rem",
    borderRadius: "12px",
    width: "370px",
    boxShadow: "0 0 25px rgba(0,0,0,0.3)",
  },
  optionContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  optionButton: {
    flex: 1,
    padding: "0.5rem",
    margin: "0 0.25rem",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  submitButton: {
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "#646cff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultado: {
    marginTop: "1.5rem",
    backgroundColor: "#333",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(100,108,255,0.4)",
  },
  infoBox: {
    marginTop: "0.5rem",
    backgroundColor: "#222",
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "left",
    lineHeight: "1.5",
  },
};

export default CrearCuenta;

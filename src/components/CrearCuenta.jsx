import { useState } from "react";
import api from "../services/api";

function CrearCuenta() {
  const [opcion, setOpcion] = useState("cliente");
  const [formData, setFormData] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setResultado(null);

    try {
      if (opcion === "cliente") {
        const resCliente = await api.post("/cliente", formData);
        if (resCliente.data.success) {
          const clienteData = resCliente.data.data;
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
        const resNegocio = await api.post("/negocio", formData);
        if (resNegocio.data.success) {
          const negocioData = resNegocio.data.data;
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

  const renderInput = (name, label, type = "text", placeholder = "") => (
    <div style={styles.inputGroup}>
      <label htmlFor={name} style={styles.label}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        required
        style={styles.input}
      />
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>🆕 Crear Cuenta</h2>

        {/* Selector */}
        <div style={styles.optionContainer}>
          <button
            style={{
              ...styles.optionButton,
              backgroundColor: opcion === "cliente" ? "#646cff" : "#444",
            }}
            onClick={() => { setOpcion("cliente"); setFormData({}); setMensaje(""); setResultado(null); }}
          >
            Crear Cliente
          </button>
          <button
            style={{
              ...styles.optionButton,
              backgroundColor: opcion === "negocio" ? "#646cff" : "#444",
            }}
            onClick={() => { setOpcion("negocio"); setFormData({}); setMensaje(""); setResultado(null); }}
          >
            Crear Negocio
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {opcion === "cliente" ? (
            <>
              {renderInput("paterno", "Apellido paterno", "text", "Ej: Pérez")}
              {renderInput("materno", "Apellido materno", "text", "Ej: Gómez")}
              {renderInput("nombre", "Nombre", "text", "Ej: Juan")}
              {renderInput("dni", "DNI", "text", "Ej: 12345678")}
              {renderInput("nacimiento", "Fecha de nacimiento", "date")}
              {renderInput("ciudad", "Ciudad", "text", "Ej: Guatemala")}
              {renderInput("direccion", "Dirección", "text", "Ej: 12 Av. Zona 1")}
              {renderInput("telefono", "Teléfono", "text", "Ej: 5555-5555")}
              {renderInput("email", "Correo electrónico", "email", "ejemplo@mail.com")}
            </>
          ) : (
            <>
              {renderInput("nombre", "Nombre del negocio", "text", "Ej: Mi tienda")}
              {renderInput("nit", "NIT", "text", "Ej: 123456-7")}
              {renderInput("ciudad", "Ciudad", "text", "Ej: Guatemala")}
              {renderInput("direccion", "Dirección", "text", "Ej: 12 Av. Zona 1")}
              {renderInput("telefono", "Teléfono", "text", "Ej: 5555-5555")}
              {renderInput("email", "Correo electrónico", "email", "ejemplo@mail.com")}
            </>
          )}

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Procesando..." : "Enviar"}
          </button>
        </form>

        {mensaje && <p style={styles.error}>{mensaje}</p>}

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
    padding: "1rem",
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 0 25px rgba(0,0,0,0.3)",
  },
  optionContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  optionButton: {
    flex: 1,
    padding: "0.75rem",
    margin: "0 0.25rem",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.25rem",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "0.2s",
  },
  submitButton: {
    marginTop: "1rem",
    padding: "0.85rem",
    backgroundColor: "#646cff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "0.2s",
  },
  error: {
    marginTop: "1rem",
    color: "#f87171",
    textAlign: "center",
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

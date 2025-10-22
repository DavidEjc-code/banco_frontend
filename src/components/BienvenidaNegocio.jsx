import React from "react";

function BienvenidaNegocio() {
  return (
    <div style={styles.container}>
      <h1>🏢 Bienvenido Negocio</h1>
      <p>Has iniciado sesión correctamente en Banco Tikal.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    color: "#fff",
  },
};

export default BienvenidaNegocio;

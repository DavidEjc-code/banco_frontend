import clienteImg from "../assets/cliente.jpg";
import transferenciaImg from "../assets/transferencia.jpg";
import reporteImg from "../assets/reporte.jpg";
import creditosImg from "../assets/creditos.jpg";

function TestConexion() {
  const contenedores = [
    { titulo: "Presidente", imagen: clienteImg },
    { titulo: "Vicepresidente", imagen: transferenciaImg },
    { titulo: "Gerente", imagen: reporteImg },
    { titulo: "Coordinador", imagen: creditosImg },
  ];

  return (
    <div style={styles.grid}>
      {contenedores.map((caja, i) => (
        <div
          key={i}
          style={{
            ...styles.card,
            backgroundImage: `url(${caja.imagen})`,
          }}
        >
          <div style={styles.overlay}></div>
          <h2 style={styles.titulo}>{caja.titulo}</h2>
        </div>
      ))}
    </div>
  );
}

export default TestConexion;

// 🎨 Estilos
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    height: "80vh",
    width: "80vw",
    margin: "auto",
    gap: "1rem",
    padding: "1rem",
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    position: "relative",
    borderRadius: "16px",
    border: "4px solid white",
    backgroundSize: "auto 100%",

    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.3s ease",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  titulo: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    color: "white",
    fontSize: "1.8rem",
    fontWeight: "bold",
    textShadow: "2px 2px 6px #000",
  },
};

function Depositar() {
  return (
    <div style={styles.page}>
      <h2>💵 Depositar</h2>
      <p>Aquí podrás realizar depósitos a cuentas existentes.</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
};

export default Depositar;

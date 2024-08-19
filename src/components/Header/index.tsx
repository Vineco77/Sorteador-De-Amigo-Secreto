import "./styles.css";

const header = () => {
  return (
    <header className="header">
      <div
        className="imagem-logo"
        role="img"
        aria-label="Logo do Sorteador"
      ></div>
      <img
        className="participants"
        src="/Img/participante.png"
        alt="Participante com um presente na mão"
      />
    </header>
  );
};

export default header;

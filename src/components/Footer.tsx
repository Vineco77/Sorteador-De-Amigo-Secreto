import { useNavigate } from "react-router-dom";
import { useParticipantsList } from "../state/hooks/useParticipantsList";
import { useDrawer } from "../state/hooks/useDrawer";

import "./Footer.css";

const Footer = () => {
  const participants = useParticipantsList();

  const navigateTo = useNavigate();

  const toDraw = useDrawer();

  const start = () => {
    toDraw();
    navigateTo("/draw");
  };

  return (
    <footer className="footer-config">
      <button
        className="btn"
        disabled={participants.length < 3}
        onClick={start}
      >
        Iniciar brincadeira
      </button>
      <img src="/Img/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
};

export default Footer;

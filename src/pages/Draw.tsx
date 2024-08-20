import { useState } from "react";
import Card from "../components/Card";
import { useParticipantsList } from "../state/hooks/useParticipantsList";
import { useDrawResult } from "../state/hooks/useDrawResult";

import "./Draw.css";

const Draw = () => {
  const participants = useParticipantsList();
  const [participantOfTheTime, setParticipantOfTheTime] = useState("");
  let [secretFriend, setSecretFriend] = useState("");
  const result = useDrawResult();
  const toDraw = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (result.has(participantOfTheTime)) {
      setSecretFriend(result.get(participantOfTheTime)!);
      // Add Timeout to clear secretFriend after using
      setTimeout(() => {
        setSecretFriend("");
      }, 5000);
    }
  };

  return (
    <Card>
      <section className="draw">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={toDraw}>
          <select
            required
            name="participantOfTheTime"
            id="participantOfTheTime"
            placeholder="Selecione o seu nome"
            value={participantOfTheTime}
            onChange={(event) => setParticipantOfTheTime(event.target.value)}
          >
            <option>Selecione seu nome</option>
            {participants.map((participant) => (
              <option key={participant}>{participant}</option>
            ))}
          </select>
          <p>Clique em sortear para ver quem é seu amigo secreto!</p>
          <button className="btn-toDraw">Sortear</button>
        </form>
        {secretFriend && (
          <p className="result" role="alert">
            {secretFriend}
          </p>
        )}
        <footer className="draw">
          <img
            src="/Img/aviao.png"
            className="aviao"
            alt="Um desenho de um avião de papel"
          />
        </footer>
      </section>
    </Card>
  );
};

export default Draw;

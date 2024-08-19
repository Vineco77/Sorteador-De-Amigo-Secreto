import { useRef, useState } from "react";
import { useAddParticipant } from "../state/hooks/useAddParticipant";
import { useErroMessage } from "../state/hooks/useErroMessage";

import "./Form.css";

const Form = () => {
  const [name, setName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const addOnList = useAddParticipant();

  const erroMessage = useErroMessage();

  const addParticipant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addOnList(name);
    setName("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={addParticipant}>
      <div className="input-btn-group">
        <input
          ref={inputRef}
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!name}>Adicionar</button>
      </div>
      {erroMessage && (
        <p className="alert error" role="alert">
          {erroMessage}
        </p>
      )}
    </form>
  );
};

export default Form;

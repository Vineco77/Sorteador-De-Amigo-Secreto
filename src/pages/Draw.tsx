import { useParticipantsList } from "../state/hooks/useParticipantsList";

const Draw = () => {
  const participants = useParticipantsList();

  return (
    <section>
      <form>
        <select name="participantOfTheTime" id="participantOfTheTime">
          {participants.map((participant) => (
            <option key={participant}>{participant}</option>
          ))}
        </select>
      </form>
    </section>
  );
};

export default Draw;

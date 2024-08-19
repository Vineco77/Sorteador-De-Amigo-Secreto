import { conductDraw } from "./conductDraw";

describe("Given a Secret Santa draw", () => [
  test("Each participant should not draw their own name", () => {
    const participants = ["Ana", "Catarina", "João", "Vinicius", "Juliana"];

    const draw = conductDraw(participants);
    participants.forEach((participant) => {
      const secretFriend = draw.get(participant);
      expect(secretFriend).not.toEqual(participant);
    });
  }),
]);

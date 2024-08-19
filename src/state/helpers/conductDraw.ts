import shuffle from "just-shuffle";

export function conductDraw(participants: string[]) {
  const participantsTotal = participants.length;
  const shuffled = shuffle(participants);

  const result = new Map<string, string>();

  for (let i = 0; i < participantsTotal; i++) {
    const friendIndex = i === participantsTotal - 1 ? 0 : i + 1;

    result.set(shuffled[i], shuffled[friendIndex]);
  }
  return result;
}

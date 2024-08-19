import { atom } from "recoil";

export const participantListState = atom<string[]>({
  key: "participantListState",
  default: [],
});

export const secretFriendResult = atom<Map<string, string>>({
  key: "secretFriendResult",
  default: new Map(),
});

export const erroState = atom<string>({
  key: "erroState",
  default: "",
});

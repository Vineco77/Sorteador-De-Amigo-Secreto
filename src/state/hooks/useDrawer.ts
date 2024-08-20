import { useSetRecoilState } from "recoil";
import { secretFriendResult } from "../atom";
import { conductDraw } from "../helpers/conductDraw";
import { useParticipantsList } from "./useParticipantsList";

export const useDrawer = () => {
  const participants = useParticipantsList();
  const setResult = useSetRecoilState(secretFriendResult);

  return () => {
    const result = conductDraw(participants);
    setResult(result);
  };
};

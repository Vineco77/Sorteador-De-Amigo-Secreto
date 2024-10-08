import { useRecoilValue, useSetRecoilState } from "recoil";
import { erroState, participantListState } from "../atom";

export const useAddParticipant = () => {
  const setList = useSetRecoilState(participantListState);
  const list = useRecoilValue(participantListState);
  const setErro = useSetRecoilState(erroState);
  return (participantName: string) => {
    if (list.includes(participantName)) {
      setErro("Duplicated names aren't allowed");
      setTimeout(() => {
        setErro("");
      }, 5000);
      return;
    }
    return setList((currentList) => [...currentList, participantName]);
  };
};

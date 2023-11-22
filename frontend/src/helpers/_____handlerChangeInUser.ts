import { User } from "../types/User";
import handlerChangeUser from "./_____handlerChangeUser";

type ChangeInUser = (
  isAddition: boolean,
  currentUser: User | null,
  typeParam: 'genres' | 'bands' | 'tickets',
  paramId: string,
  extraState: boolean,
  setExtraState: (newState: boolean) => void,
) => void;

const handlerChangeInUser: ChangeInUser = (
  isAddition, currentUser, typeParam, paramId, extraState, setExtraState,
) => {
  if (currentUser) {
    const newGenres = isAddition
      ? [...currentUser[typeParam], paramId]
      : currentUser[typeParam].filter(id => id !== paramId);

    handlerChangeUser(currentUser, typeParam, newGenres, extraState, setExtraState);;
  }
};

export default handlerChangeInUser;

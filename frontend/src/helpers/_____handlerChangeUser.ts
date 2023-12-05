import { patchUser } from "../api/_____userApi";
// import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import { User } from "../types/User";

type ChangeUser = (
  currentUser: User,
  typeParam: 'genres' | 'bands' | 'tickets',
  newParamsIds: string[],
  extraState: boolean,
  setExtraState: (newState: boolean) => void,
) => void;

const handlerChangeUser: ChangeUser = (
  currentUser, typeParam, newParamsIds, extraState, setExtraState,
) => {
  // const dispatch = useAppDispatch();

  const oldUser = { ...currentUser };
  const newUser = { ...oldUser};

  // newUser[typeParam] = newParamsIds;



  // dispatch(setUser(newUser));
  // setExtraState(!extraState);

  // patchUser(oldUser.id, newUser)
  //   .then(() => { })
  //   .catch(() => {
  //     dispatch(setUser(oldUser));
  //     setExtraState(extraState)
  //   })
};

export default handlerChangeUser;

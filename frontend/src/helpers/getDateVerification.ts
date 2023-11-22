import { InputsNames } from "../types/InputsNames";
import getEmailVerification from "./getEmailVerification";
import getFirstPasswVerific from "./getFirstPasswVerific";
import getNameVerification from "./getNameVerification";
import getSecondPasswVerific from "./getSecondPasswVerific";

export type Message = {
  element: InputsNames,
  messages: string,
};

export type DateVerification = {
  email: string,
  firstPassw: string,
  name: string | null,
  secondPassw: string | null,
};

type getIncorrectInputs = (data: DateVerification) => Message[] | null;

export const getDateVerification: getIncorrectInputs = (data) => {
  const { email, firstPassw, name, secondPassw } = data;
  
  const emailMess = getEmailVerification(email);
  const firstPasswMess = getFirstPasswVerific(firstPassw);
  const nameMess = name !== null
    ? getNameVerification(name)
    : name;
  const secondPassMess = secondPassw !== null
    ? getSecondPasswVerific(secondPassw, firstPassw)
    : secondPassw;

  if (!emailMess && !firstPasswMess && !nameMess && !secondPassMess) {
    return null;
  }

  const result: Message[] = [];

  [emailMess, firstPasswMess, nameMess, secondPassMess].forEach(mess => {
    if (mess !== null) {
      result.push(mess);
    }
  });

  return result;
};

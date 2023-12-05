import { InputsNames } from "../types/InputsNames";
import { Message } from "./getDateVerification";

export default function getSecondPasswVerific(
  secondPassw: string, firstPassw: string
): Message | null {
  if (firstPassw !== secondPassw) {
    const newMess = 'Password and repeat password must be same.';

    return { element: InputsNames.SecondPass, messages: newMess };
  }

  return null;
};
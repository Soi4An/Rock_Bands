import { InputsNames } from "../types/InputsNames";
import { Message } from "./getDateVerification";

const MIN_FIRSTPASSW_LENGTH = 8;
const MAX_FIRSTPASSW_LENGTH = 32;

export default function getFirstPasswVerific(firstPassw: string): Message | null {
  if (firstPassw.length < MIN_FIRSTPASSW_LENGTH || firstPassw.length > MAX_FIRSTPASSW_LENGTH) {
    const newMess = `Password must contain ${MIN_FIRSTPASSW_LENGTH} - ${MAX_FIRSTPASSW_LENGTH} characters.`;

    return { element: InputsNames.FirstPass, messages: newMess };
  }

  if (!/^[0-9a-zA-Z=+!@#$%^&*()_-]{8,}$/.test(firstPassw)) {
    const newMess = `Password can contain numbers, Latin letters, and =+-_)(*&^%$#@! characters.`;

    return { element: InputsNames.FirstPass, messages: newMess };
  }

  return null;
};

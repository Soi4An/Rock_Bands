import { InputsNames } from "../types/InputsNames";
import { Message } from "./getDateVerification";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 15;

export default function getNameVerification(name: string): Message | null {
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    const newMess = `Name must contain ${MIN_NAME_LENGTH} - ${MAX_NAME_LENGTH} characters.`;

    return { element: InputsNames.Name, messages: newMess };
  }

  if (!/^[A-Z]{1}/.test(name)) {
    const newMess = `Name must start with an uppercase letter.`;

    return { element: InputsNames.Name, messages: newMess };
  }

  if (!/^[A-Za-z]+$/.test(name)) {
    const newMess = `Name must contain only Latin letters.`;

    return { element: InputsNames.Name, messages: newMess };
  }

  return null;
};

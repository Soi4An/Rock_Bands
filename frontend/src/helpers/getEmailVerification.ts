import { InputsNames } from "../types/InputsNames";
import { Message } from "./getDateVerification";

const MIN_EMAIL_LENGTH = 3;
const MAX_EMAIL_LENGTH = 20;
const REGUX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function getEmailVerification(email: string): Message | null {
  if (!email.includes('@')) {
    const newMess = `Email address must contain \'@\'.`;

    return { element: InputsNames.Email, messages: newMess };
  }

  if (!REGUX_EMAIL.test(email)) {
    const newMess = `Email address structure must be example@example.`;

    return { element: InputsNames.Email, messages: newMess };
  }

  if (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH) {
    const newMess = `Email address must contain ${MIN_EMAIL_LENGTH} - ${MAX_EMAIL_LENGTH} characters.`;

    return { element: InputsNames.Email, messages: newMess };
  }

  return null;
};

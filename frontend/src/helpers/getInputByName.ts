import { InputsNames } from "../types/InputsNames";
import iconUser from '../images/icon-user.svg';
import iconEmail from '../images/icon-email.svg';
import iconLock from '../images/icon-lock.svg';

const ID_INPUT_NAME = 'sign-name';
const ID_INPUT_EMAIL = 'sign-email';
const ID_INPUT_PASSW = 'sign-password-1';
const ID_INPUT_R_PASSW = 'sign-password-2';
////////////

export default function getInputByName(name: InputsNames) {
  switch (name) {
    case InputsNames.Name:
      return {
        id: ID_INPUT_NAME,
        label: 'Name',
        type: 'text',
        placeholder: 'John Doe',
        imgLink: iconUser,
        isPassword: false,
      };

    case InputsNames.Email:
      return {
        id: ID_INPUT_EMAIL,
        label: 'Email',
        type: 'email',
        placeholder: 'example@urk.com',
        imgLink: iconEmail,
        isPassword: false,
      };

    case InputsNames.FirstPass:
      return {
        id: ID_INPUT_PASSW,
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        imgLink: iconLock,
        isPassword: true,
      };

    case InputsNames.SecondPass:
      return {
        id: ID_INPUT_R_PASSW,
        label: 'Repeat password',
        type: 'password',
        placeholder: 'Repeat password',
        imgLink: iconLock,
        isPassword: true,
      };

    default:
      return;
  }
};

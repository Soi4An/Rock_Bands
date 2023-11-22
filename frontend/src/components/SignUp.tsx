import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getDateVerification } from '../helpers/getDateVerification';
import { Status } from '../types/Status';
import { FormInputGroup } from './FormInputGroup';
import { InputsNames } from '../types/InputsNames';
import { getRegistUserAsyncBy } from '../redux/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const { state } = useLocation();
  const { user, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstPassw, setFirstPassw] = useState<string>('');
  const [secondPassw, setSecondPassw] = useState<string>('');

  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorFirstPassw, setErrorFirstPassw] = useState<string | null>(null);
  const [errorSecondPassw, setErrorSecondPassw] = useState<string | null>(null);
  const [errorMainMess, setErrorMainMess] = useState<boolean>(false);

  const disabled = !name || !email || !firstPassw || !secondPassw || status === Status.Loading;

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = getDateVerification({ email, firstPassw, name, secondPassw });

    if (!newErrors) {
      dispatch(getRegistUserAsyncBy({ name, email, password: firstPassw }))
    } else {
      newErrors.forEach(err => {
        const { element, messages } = err;

        switch (element) {
          case InputsNames.Name:
            return setErrorName(messages);

          case InputsNames.Email:
            return setErrorEmail(messages);

          case InputsNames.FirstPass:
            return setErrorFirstPassw(messages);

          case InputsNames.SecondPass:
            return setErrorSecondPassw(messages);

          default:
            return;
        }
      });
    }
  };

  useEffect(() => {
    if (status === Status.Failed) {
      setErrorMainMess(true);
    }

  }, [status]);

  useEffect(() => {
    const offError = () => setErrorMainMess(false);

    document.addEventListener('click', offError);

    return () => document.removeEventListener('click', offError);
  }, []);

  if (user) {
    return <Navigate to={state} />;
  }

  return (
    <>
      <div className="mb-1">
        <FormInputGroup
          name={InputsNames.Name}
          value={name}
          setValue={setName}
          error={errorName}
          setError={setErrorName}
        />

        <FormInputGroup
          name={InputsNames.Email}
          value={email}
          setValue={setEmail}
          error={errorEmail}
          setError={setErrorEmail}
        />

        <FormInputGroup
          name={InputsNames.FirstPass}
          value={firstPassw}
          setValue={setFirstPassw}
          error={errorFirstPassw}
          setError={setErrorFirstPassw}
        />

        <FormInputGroup
          name={InputsNames.SecondPass}
          value={secondPassw}
          setValue={setSecondPassw}
          error={errorSecondPassw}
          setError={setErrorSecondPassw}
        />

        <Form.Text className={classNames(
          'transition-opacity',
          'text-danger',
          'fs-6',
          { 'opacity-100': errorMainMess },
          { 'opacity-0': !errorMainMess }
        )}>
          {'Something went wrong...'}
        </Form.Text>
      </div>

      <div className="d-grid">
        <Button
          disabled={disabled}
          type="submit"
          size="lg"
          onClick={handlerSubmit}
        >
          {status === Status.Loading
            ? <span
              className="spinner-border spinner-border-md"
              role="status"
              aria-hidden="true"
            />
            : 'Register'
          }
        </Button>
      </div>
    </>
  );
};

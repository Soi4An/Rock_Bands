import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getLoginUserAsyncBy } from '../redux/slices/userSlice';
import { Status } from '../types/Status';
import { FormInputGroup } from './FormInputGroup';
import { InputsNames } from '../types/InputsNames';
import classNames from 'classnames';
import { Navigate, useLocation } from 'react-router-dom';
import { DateVerification, getDateVerification } from '../helpers/getDateVerification';

export const SignIn: React.FC = () => {
  const { state } = useLocation();
  // console.log("🚀 ~ file: SignIn.tsx:17 ~ state:", state)
  const { user, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMess, setErrorMess] = useState<boolean>(false);

  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassw, setErrorPassw] = useState<string | null>(null);
  
  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDate: DateVerification = {
      email: email,
      firstPassw: password,
      name: null,
      secondPassw: null,
    };
    const newErrors = getDateVerification(newDate);

    if (!newErrors) {
      dispatch(getLoginUserAsyncBy({ email, password }))
      ////add navigate
    } else {
      newErrors.forEach(err => {
        const { element, messages } = err;

        switch (element) {
          case InputsNames.Email:
            return setErrorEmail(messages);

          case InputsNames.FirstPass:
            return setErrorPassw(messages);

          default:
            return;
        }
      });
    }
  };

  useEffect(() => {
    if (status === Status.Failed) {
      setErrorMess(true);
    }

  }, [status]);

  useEffect(() => {
    const offError = () => setErrorMess(false);

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
          name={InputsNames.Email}
          value={email}
          setValue={setEmail}
          error={errorEmail}
          setError={setErrorEmail}
        />

        <FormInputGroup
          name={InputsNames.FirstPass}
          value={password}
          setValue={setPassword}
          error={errorPassw}
          setError={setErrorPassw}
        />

        <Form.Text className={classNames(
          'transition-opacity',
          'text-danger',
          'fs-6',
          { 'opacity-100': errorMess },
          { 'opacity-0': !errorMess }
        )}>
          {'Something went wrong...'}
        </Form.Text>
      </div>



      <div className="d-grid">
        <Button
          className="d-flex justify-content-center"
          disabled={!email || !password || status === Status.Loading}
          type="submit"
          size="lg"
          onClick={handlerSubmit}
        >
          {status === Status.Loading
            ? <Spinner animation="border" />
            : 'Sign In'
          }
        </Button>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import { FormInputGroup } from './FormInputGroup';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { InputsNames } from '../types/InputsNames';
import { patchUser } from '../api/_____userApi';
import { DateVerification, getDateVerification } from '../helpers/getDateVerification';
import { User } from '../types/User';
import { setUser } from '../redux/slices/userSlice';

function UserSetting() {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(user?.email || '');
  const [name, setName] = useState<string>(user?.name || '');
  const [password, setPassword] = useState<string>(user?.password || '');
  const [secondPassw, setSecondPassw] = useState<string>(user?.password || '');

  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorPassw, setErrorPassw] = useState<string | null>(null);
  const [errorSecondPassw, setErrorSecondPassw] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const disabledSubmit = email === user?.email
    || name === user?.name
    || password === user?.password
    || isLoading
    || !email
    || !name
    || !password
    || !secondPassw;

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDate: DateVerification = {
      email: email,
      firstPassw: password,
      name: name,
      secondPassw: secondPassw,
    };
    const newErrors = getDateVerification(newDate);

    if (!!user) {
      if (!newErrors) {
        setIsLoading(true);

        const newUser: User = {
          ...user,
          email: email,
          password: password,
          name: name,
        };

        patchUser(user.id, newUser)
          .then(() => {
            setIsSuccess(true);
            dispatch(setUser(newUser));
          })
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false));
      } else {
        newErrors.forEach(err => {
          const { element, messages } = err;

          switch (element) {
            case InputsNames.Email:
              return setErrorEmail(messages);

            case InputsNames.Name:
              return setErrorName(messages);

            case InputsNames.FirstPass:
              return setErrorPassw(messages);

            case InputsNames.SecondPass:
              return setErrorSecondPassw(messages);

            default:
              return;
          }
        });
      }
    }
  };


  useEffect(() => {
    const offErrorAndSuccess = () => {
      setIsError(false);
      setIsSuccess(false);
    };

    document.addEventListener('click', offErrorAndSuccess);

    return () => document.removeEventListener('click', offErrorAndSuccess);
  }, []);

  return (
    <>
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
      >
        <div className="mb-1">
          <h4 className="my-3 text-center">
            {'Make changes and click the button "Save changes"'}
          </h4>

          <div className="d-lg-flex justify-content-between gap-4">
            <div className="flex-grow-1">
              <FormInputGroup
                name={InputsNames.Email}
                value={email}
                setValue={setEmail}
                error={errorEmail}
                setError={setErrorEmail}
                withIcons={false}
              />

              <FormInputGroup
                name={InputsNames.Name}
                value={name}
                setValue={setName}
                error={errorName}
                setError={setErrorName}
                withIcons={false}
              />
            </div>

            <div className="flex-grow-1">
              <FormInputGroup
                name={InputsNames.FirstPass}
                value={password}
                setValue={setPassword}
                error={errorPassw}
                setError={setErrorPassw}
                withIcons={false}
              />

              <FormInputGroup
                name={InputsNames.SecondPass}
                value={secondPassw}
                setValue={setSecondPassw}
                error={errorSecondPassw}
                setError={setErrorSecondPassw}
                withIcons={false}
              />
            </div>
          </div>
        </div>

        <div className="position-relative">
          <Form.Text className={classNames(
            'position-absolute',
            'm-0',
            'transition-opacity',
            'text-success',
            'fs-6',
            { 'opacity-100': isSuccess && !isError },
            { 'opacity-0': !isSuccess }
          )}>
            {'Data have changed'}
          </Form.Text>

          <Form.Text className={classNames(
            'transition-opacity',
            'text-danger',
            'fs-6',
            { 'opacity-100': isError && !isSuccess },
            { 'opacity-0': !isError }
          )}>
            {'Something went wrong...'}
          </Form.Text>
        </div>

        <div className="d-grid">
          <Button
            className="w-100"
            disabled={disabledSubmit}
            type="submit"
            size="lg"
            onClick={handlerSubmit}
          >
            {isLoading
              ? <Spinner animation="border" />
              : 'Save changes'
            }
          </Button>
        </div>
      </Col>
    </>
  );
}

export default UserSetting;

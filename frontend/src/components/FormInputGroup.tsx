import React, { useState } from 'react';
import '../styles/customStyles.scss';
import classNames from 'classnames';
import { InputsNames } from '../types/InputsNames';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import iconEye from '../images/icon-eye.svg';
import iconEyeSlash from '../images/icon-eye-slash.svg';
import getInputByName from '../helpers/getInputByName';

type Props = {
  name: InputsNames,
  value: string,
  setValue: (newValue: string) => void,
  error?: string | null,
  setError?: (newErrors: string | null) => void
};

export const FormInputGroup: React.FC<Props> = ({
  name, value, setValue, error = null, setError = () => { },
}) => {
  const input = getInputByName(name);

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <Form.Group className="mb-2">
      <Form.Label
        className={classNames('mb-2', 'transition-color', { 'text-danger': !!error })}
        htmlFor={input?.id}
      >
        {!error ? `${input?.label}:` : error}
      </Form.Label>

      <InputGroup>
        <InputGroup.Text
          className={classNames(
            'transition-border', { 'border-danger': !!error }
          )}
        >
          <img src={input?.imgLink} alt={name} />
        </InputGroup.Text>

        <Form.Control
          id={input?.id}
          placeholder={input?.placeholder}
          autoComplete="on"
          name={name}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setError(null)}
          className={classNames(
            'transition-border', { 'border-danger': !!error }
          )}
          type={isShowPassword ? 'text' : input?.type}
        />

        {input?.isPassword && (
          <Button
            className={classNames(
              'd-flex',
              'align-items-center',
              'transition-border',
              { 'border-danger': !!error },
            )}
            variant="outline-secondary"
            onClick={() => setIsShowPassword(c => !c)}
          >
            <img
              src={isShowPassword ? iconEye : iconEyeSlash}
              alt="eye"
            />
          </Button>
        )}
      </InputGroup>
    </Form.Group>
  );
};

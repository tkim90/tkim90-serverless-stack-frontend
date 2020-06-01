import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import { LoaderButton } from "../components/LoaderButton";
import { useAppContext } from '../libs/contextLib';
import { useFormFields } from '../libs/hooksLib';
import { onError } from '../libs/errorLibs';
import './Login.css';


export const Login = () => {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          isLoading={isLoading}
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
        >
          Login
        </LoaderButton>
      </form>
    </div>
  )
}


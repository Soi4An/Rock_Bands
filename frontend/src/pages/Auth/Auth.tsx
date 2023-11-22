import React, { useState, useEffect } from 'react';

import { Header } from "../../components/Header";
import { SignIn } from "../../components/SignIn";
import { SignUp } from '../../components/SignUp';
import { useAppSelector } from '../../redux/hooks';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Status } from '../../types/Status';

export const Auth: React.FC = () => {
  const { status } = useAppSelector(state => state.user);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <>
      <Header />

      <Container className="px-0 pt-2 pt-md-5">
        <Row className="px-0 d-flex justify-content-center">
          <Col xs={10} sm={8} md={7} lg={5}>
            <Form className="py-3 px-3 bg-light-subtle rounded">
              <div className="d-grid">
                <ButtonGroup className="mb-1 m-auto">
                  <Button
                    onClick={() => setIsSignIn(true)}
                    variant={isSignIn ? 'primary' : 'secondary'}
                    disabled={status === Status.Loading}
                  >
                    Sign In
                  </Button>

                  <Button
                    onClick={() => setIsSignIn(false)}
                    variant={!isSignIn ? 'primary' : 'secondary'}
                    disabled={status === Status.Loading}
                  >
                    Register
                  </Button>
                </ButtonGroup>
              </div>

              {isSignIn ? <SignIn /> : <SignUp />}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

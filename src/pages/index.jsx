import React, { useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="login-page">
      <Container className="form-container">
        {!showRegister ? (
          <LoginForm onShowRegister={() => setShowRegister(true)} />
        ) : (
          <RegisterForm onShowLogin={() => setShowRegister(false)} />
        )}
      </Container>
    </div>
  );
};

export default LoginPage;

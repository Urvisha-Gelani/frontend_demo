import React from "react";
import { Form, Button, FloatingLabel, FormCheck } from "react-bootstrap";
import { FaLock, FaUser } from "react-icons/fa";

const LoginForm = ({ onShowRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login submitted");
  };

  return (
    <div className="auth-form">
      <h1 className="text-center mb-4 floating">Welcome Back</h1>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="username" label="Username" className="mb-3">
          <Form.Control type="text" placeholder="Username" required />
          <FaUser className="input-icon" />
          {/* <FontAwesomeIcon icon={faUser} className="input-icon" /> */}
        </FloatingLabel>

        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" required />
          <FaLock className="input-icon" />
          {/* <FontAwesomeIcon icon={faLock} className="input-icon" /> */}
        </FloatingLabel>

        <div className="d-flex justify-content-between mb-4">
          <FormCheck type="checkbox" id="rememberMe" label="Remember me" />
          <a href="#forgot" className="text-white">
            Forgot password?
          </a>
        </div>

        <Button variant="primary" type="submit" className="w-100 auth-btn">
          Login
        </Button>

        <div className="text-center mt-4">
          <p className="text-white">
            Don't have an account?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={onShowRegister}
            >
              Register
            </button>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

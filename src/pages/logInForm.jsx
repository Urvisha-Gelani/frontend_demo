import React from "react";
import {
  Form,
  Button,
  FloatingLabel,
  FormCheck,
  Spinner,
} from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { logInSchema } from "../validation/registrationForm/logInForm.validation";
import { useAuthStore } from "../zustand-store/auth/auth.store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onShowRegister }) => {
  const { error, logInUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const onLogInUser = async (values) => {
    const response = await logInUser(values);
    const { status } = response;
    if (status === 201 || status === 200) {
      // onShowRegister();
      navigate("/dashboard/jobs");
      toast.success("User logged in successfully");
      console.log("User logged in successfully");
    } else {
      console.log("User login failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInSchema,
    onSubmit: onLogInUser,
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    formik;

  return (
    <div className="auth-form">
      <h1 className="text-center mb-4 floating text-white">Welcome Back</h1>
      {error && <div className="text-danger text-center mb-3">{error}</div>}
      <Form onSubmit={handleSubmit} noValidate>
        <FloatingLabel controlId="email" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.email && !!errors.email}
          />
          <FaEnvelope className="input-icon" />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.password && !!errors.password}
          />
          <FaLock className="input-icon" />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="d-flex justify-content-between mb-4">
          <FormCheck
            type="checkbox"
            id="rememberMe"
            label="Remember me"
            className="text-white"
          />
          <a href="#forgot" className="text-white">
            Forgot password?
          </a>
        </div>

        <Button variant="primary" type="submit" className="w-100 auth-btn">
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          ) : (
            "Log In"
          )}
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

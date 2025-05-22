import React from "react";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useFormik } from "formik";

import { useAuthStore } from "../zustand-store/auth/auth.store";
import { registrationSchema } from "../validation/registrationForm/registrationForm.validation";
import { toast } from "react-toastify";

const RegisterForm = ({ onShowLogin }) => {
  const { error, createUser, isLoading } = useAuthStore();

  const userRegistration = async (values) => {
    const { username, email, password } = values;
    const userData = {
      username,
      email,
      password,
    };

    console.log(userData, "********component*******");
    const response = await createUser(userData);
    const { status } = response;
    if (status === 201 || status === 200) {
      onShowLogin();
      toast.success("User created successfully");
      console.log("User created successfully");
    } else {
      console.log("User creation failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: userRegistration,
  });
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;
  return (
    <div className="auth-form">
      <button type="button" className="back-button" onClick={onShowLogin}>
        <FaArrowLeft className="back-icon" />
      </button>

      <h1 className="text-center mb-4 floating">Create Account</h1>
      {error && <div className="text-danger text-center mb-3">{error}</div>}
      <Form noValidate onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="regUsername"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.username && !!errors.username}
          />
          <FaUser className="input-icon" />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="regEmail" label="Email" className="mb-3">
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

        <FloatingLabel
          controlId="regPassword"
          label="Password"
          className="mb-3"
        >
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

        <FloatingLabel
          controlId="regConfirmPassword"
          label="Confirm Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
          />
          <FaLock className="input-icon" />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </FloatingLabel>

        <Button
          variant="primary"
          type="submit"
          className="w-100 auth-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Register"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;

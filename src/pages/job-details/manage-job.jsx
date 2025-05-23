import { useFormik } from "formik";
import React from "react";
import { JobSchema } from "../../validation/jobDetailsForm/jobDetailsForm.validation";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useJobStore } from "../../zustand-store/job-store/job-store";

const ManageJob = ({ showModal, closeModel, jobData }) => {
  const { jobManage, isLoading } = useJobStore();
  const formData = {
    client_name: "",
    job_title: "",
    job_date: "",
    quote: "",
    status: "pending",
  };

  const manageJobDetails = async (values) => {
    await jobManage(values);
    closeModel();
    console.log("Job details", values);
  };

  const formik = useFormik({
    initialValues: jobData ? jobData : formData,
    validateOnBlur: true,
    validationSchema: JobSchema,
    onSubmit: manageJobDetails,
  });

  const { values, handleChange, handleSubmit, errors, handleBlur } = formik;
  console.log("Form errors", errors);
  return (
    <>
      <Modal show={showModal} onHide={closeModel} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Job</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="client_name"
                    value={values.client_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.client_name}
                    required
                  />
                </Form.Group>

                <div className="text-danger">{errors.client_name}</div>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="job_title"
                    value={values.job_title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.job_title}
                    required
                  />
                </Form.Group>
                <div className="text-danger">{errors.job_title}</div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="job_date"
                    value={values.job_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.job_date}
                    required
                  />
                </Form.Group>
                <div className="text-danger">{errors.job_date}</div>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quote ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="quote"
                    value={values.quote}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    isInvalid={errors.quote}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                <div className="text-danger">{errors.quote}</div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.status}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
                <div className="text-danger">{errors.status}</div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
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
                "Save Job"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ManageJob;

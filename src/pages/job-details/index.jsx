// src/components/job-details/JobDetails.tsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Badge,
  Container,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";
import ManageJob from "./manage-job";
import { useJobStore } from "../../zustand-store/job-store/job-store";
import { limit } from "../../constant";

const JobDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState({});
  const { jobDetail, fetchJobs, totalJobs, deleteJob } = useJobStore();

  useEffect(() => {
    fetchJobs({ page: currentPage, limit });
  }, [fetchJobs, currentPage]);

  const getStatusVariant = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "primary";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const closeModel = () => {
    setShowModal(false);
  };
  console.log(jobDetail, "Job Details");

  const onEditJob = (job) => {
    setShowModal(true);
    setJobData(job);
  };

  return (
    <Container className="job-details-container">
      <Row className="justify-content-center">
        <Col lg={12} md={12} sm={12} xs={10}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Job Details</h3>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="add-job-btn"
              >
                Add New Job
              </Button>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Job Title</th>
                    <th>Job Date</th>
                    <th>Quote ($)</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(jobDetail) && jobDetail.length > 0 ? (
                    jobDetail.map((job) => {
                      const {
                        id,
                        client_name,
                        job_title,
                        job_date,
                        quote,
                        created_at,
                        status,
                      } = job;
                      return (
                        <tr key={id}>
                          <td>{client_name}</td>
                          <td>{job_title}</td>
                          <td>
                            {new Date(job_date).toLocaleDateString("en-GB")}
                          </td>
                          <td>${quote}</td>
                          <td>
                            {new Date(created_at).toLocaleDateString("en-GB")}
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(status)}>
                              {status}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => onEditJob(job)}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteJob(id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No job records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {totalJobs > limit && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            {[...Array(Math.ceil(totalJobs / limit)).keys()].map((p) => (
              <Pagination.Item
                key={p + 1}
                active={p + 1 === currentPage}
                onClick={() => setCurrentPage(p + 1)}
              >
                {p + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {showModal && (
        <ManageJob
          showModal={showModal}
          closeModel={closeModel}
          jobData={jobData}
        />
      )}
      {/* Add Job Modal */}
    </Container>
  );
};

export default JobDetails;

import * as Yup from "yup";

export const JobSchema = Yup.object().shape({
  client_name: Yup.string().required("Client Name is required"),
  job_title: Yup.string().required("Job Title is required"),
  job_date: Yup.date().required("Job Date is required"),
  quote: Yup.number()
    .required("Quote is required")
    .min(0, "Quote must be a positive number"),
  status: Yup.string().required("Status is required"),
});

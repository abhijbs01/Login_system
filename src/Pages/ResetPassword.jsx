import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useParams();

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password/${token}`,
        // `  http://localhost:8000/reset-password/${token}`,
        values
      );
      if (response.status === 200) {
        resetForm();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 || status === 404) {
          toast.error(data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        RESET PASSWORD
      </Typography>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Field
                  name="password"
                  as={TextField}
                  type="password"
                  fullWidth
                  label="Password"
                  variant="outlined"
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "RESET PASSWORD"
                  )}
                </Button>
              </Grid>
              <Grid sx={{ py: 2 }} row justifyContent={"center"} container>
                Already Have an Account?
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ResetPassword;

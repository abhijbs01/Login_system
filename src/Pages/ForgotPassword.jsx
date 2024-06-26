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
import { Link } from "react-router-dom";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/forgot-password`,
        // "http://localhost:8000/forgot-password",
        values
      )
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitting(false);
          resetForm();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while processing your request.");
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        FORGOT PASSWORD
      </Typography>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
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
                    "FORGOT PASSWORD"
                  )}
                </Button>
              </Grid>
              <Grid sx={{ py: 2 }} row justifyContent={"center"} container>
                Already Have an Account?{" "}
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

export default ForgotPassword;

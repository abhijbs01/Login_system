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
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign-up`,
        // "http://localhost:8000/sign-up"
        values
      );
      if (response.status === 201) {
        console.log(response);
        setIsSubmitting(false);
        resetForm();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      } else {
        setIsSubmitting(false);
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        SIGN UP
      </Typography>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  fullWidth
                  variant="outlined"
                  error={errors.username && touched.username}
                  helperText={
                    errors.username && touched.username ? errors.username : ""
                  }
                />
              </Grid>
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
                    "Register"
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

export default Signup;

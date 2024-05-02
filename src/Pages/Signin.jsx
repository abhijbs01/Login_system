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
import { Link, useNavigate } from "react-router-dom";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function Signin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    setIsSubmitting(true);
    axios.defaults.withCredentials = true;
    axios.post(
      `${process.env.REACT_APP_API_URL}/login`
      // "http://localhost:8000/login"
      , values)
      .then((response) => {
        setIsSubmitting(false);
        if (response.status === 200) {
          resetForm();
          navigate("/home");
        } else {
          toast.error("Unexpected response from server");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 404) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        } else {
          toast.error("Network error. Please check your internet connection.");
        }
      });
  };
  

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        SIGN IN

      </Typography>
      <Formik
        initialValues={{
          email: "",
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
                    "Login"
                  )}
                </Button>
              </Grid>
              <Grid container justifyContent="center">
                <Typography sx={{ paddingTop: 2 }}>
                  Don't have an account?{" "}
                  <Typography
                    component={Link}
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      color: "inherit",
                    }}
                  >
                    Sign up
                  </Typography>
                  <Typography
                    component={Link}
                    to="/forgot-password"
                    style={{
                      textDecoration: "none",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      color: "inherit",
                    }}
                  >
                    Forgot password
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Signin;

import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/logout`)
      .then((res) => {
        if (res.data.status) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Container>
        <Grid container>
          <Grid>
            <Button color="secondary">
              <Link to="/dashboard" sx={{ border: "none" }}>
                Dashboard
              </Link>
            </Button>
          </Grid>
          <Grid>
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;

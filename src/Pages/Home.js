import { Button, Container, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get(
        // `${process.env.REACT_APP_API_URL}/logout`
        `http://localhost:8000/logout`
      )
      .then((res) => {
        if (res.data.status) {
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
        // Display an error message to the user
        alert("An error occurred while logging out. Please try again later.");
      });
  };

  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <Button color="secondary" component={Link} to="/dashboard" sx={{ border: "none" }}>
              Dashboard
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={openLogoutDialog}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog}>Cancel</Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;

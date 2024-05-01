import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8000/verify")
      .then((res) => {
        if (res.data.status) {
          console.log("Authorized");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/"); 
      });
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;

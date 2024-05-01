import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthorization = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/verify`
        );

        if (response.data.status) {
          console.log("Authorized");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };
    fetchAuthorization();
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;

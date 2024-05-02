import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        alert("An error occurred while checking authorization. Please try again later.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuthorization();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;

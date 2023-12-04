import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Task.css";
import { ToastContainer, toast } from "react-toastify";
import "../App.css"

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        toast.success("You have Logged out Successfully.");
        
          navigate("/login");
       

        if (!res.status == 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err, "Logout");
      });
  });

  return (
    <>
      <ToastContainer />
      <div className="logoutPage">
        <h2>Logged Out Succesfully !</h2>
        <h3>Please Wait ...</h3>
      </div>
    </>
  );
};

export default Logout;

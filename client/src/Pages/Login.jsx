import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        toast.error("Invalid Credentials");
      } else {
        toast.success("Logged In Successfully.", {
          autoClose: 2000,
        });

        // Delay navigation after the toast is shown
        setTimeout(() => {
          navigate("/task");
        }, 1800);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login_container">
        <div className="login_box">
          <div className="login_right">
            <h1>Login</h1>
            <form method="POST" className="login_formm">
              <div className="form__group field">
                <input
                  type="text"
                  className="form__field1"
                  placeholder="Enter Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="off"
                />
                <label htmlFor="name" className="form__label1">
                  Email
                </label>
              </div>
              <div
                className="form__group field"
                style={{ marginBottom: "20px" }}
              >
                <input
                  type="password"
                  className="form__field1"
                  placeholder="Enter Password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
                <label htmlFor="password" className="form__label1">
                  Password
                </label>
              </div>
              <button onClick={loginUser} className="button">
                Login
              </button>
              <div className="alreadyAcc">
                <p>Don't have an account?</p>
                <NavLink to="/" className="login_Address">
                  Register
                </NavLink>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/register.css";

const Input = ({ val, placeholder, type, name, value, onChange }) => {
  return (
    <>
      <div className="form__group field">
        <input
          type={type}
          className="form__field"
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={onChange}
        />
        <label htmlFor="name" className="form__label">
          {val}
        </label>
      </div>
    </>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = user;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (password !== confirmPassword) {
      toast.error("Password didn't match");
    } else if (response.status === 422 || !data) {
      toast.error("Email already exists. Please use a different email.");
    } else {
      toast.success("Registration Successful.", {
        autoClose: 3000,
      });

      // Delay navigation after the toast is shown
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="register_container">
      <div className="register_box">
        <div className="register_left">
          <h2>Register</h2>
          <form method="POST" className="form_here">
            <Input
              type="text"
              val="Name"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              val="Email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              val="Password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <Input
              type="password"
              val="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            <button onClick={handleClick} className="button">
              Submit
            </button>
          </form>

          <div className="alreadyAcc">
            <p className="P_already">Already have Account?</p>
            <NavLink to="/login" className="login_Address">
              Login
            </NavLink>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;

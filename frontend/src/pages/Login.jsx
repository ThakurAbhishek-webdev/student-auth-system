import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://student-auth-system-gtb0.onrender.com/api/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "student",
        JSON.stringify(res.data.student)
      );

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          value={email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="form-control mb-3"
          value={password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success">
          Login
        </button>
      </form>

      <p className="mt-3">
        New User? <Link to="/">Register</Link>
      </p>
    </div>
  );
}

export default Login;
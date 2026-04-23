import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic"
  });

  const { title, description, category } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://student-auth-system-gtb0.onrender.com/api/grievances",
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Grievance Submitted Successfully");

      setFormData({
        title: "",
        description: "",
        category: "Academic"
      });

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Grievance Dashboard</h2>

      <h4 className="mt-4">Submit New Grievance</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="form-control mb-3"
          value={title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Enter Description"
          className="form-control mb-3"
          value={description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="form-control mb-3"
          value={category}
          onChange={handleChange}
        >
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button className="btn btn-primary">
          Submit Grievance
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
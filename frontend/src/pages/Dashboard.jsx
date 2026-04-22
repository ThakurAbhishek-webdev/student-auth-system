import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedStudent = JSON.parse(localStorage.getItem("student"));

    if (!token) {
      navigate("/login");
    }

    if (savedStudent) {
      setStudent(savedStudent);
      setCourse(savedStudent.course);
    }
  }, [navigate]);

  const updatePassword = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/update-password",
        {
          oldPassword,
          newPassword
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Password Updated Successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateCourse = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/update-course",
        { course },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      const updatedStudent = {
        ...student,
        course
      };

      localStorage.setItem(
        "student",
        JSON.stringify(updatedStudent)
      );

      setStudent(updatedStudent);

      alert("Course Updated Successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    alert("Logout Successful");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Student Dashboard</h2>

      <h4>Name: {student.name}</h4>
      <h4>Email: {student.email}</h4>
      <h4>Course: {student.course}</h4>

      <hr />

      <h3>Update Password</h3>

      <input
        type="password"
        placeholder="Old Password"
        className="form-control mb-3"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        className="form-control mb-3"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        className="btn btn-warning mb-4"
        onClick={updatePassword}
      >
        Update Password
      </button>

      <hr />

      <h3>Change Course</h3>

      <input
        type="text"
        className="form-control mb-3"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button
        className="btn btn-info mb-4"
        onClick={updateCourse}
      >
        Update Course
      </button>

      <hr />

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
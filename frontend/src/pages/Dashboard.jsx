// import React, { useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "Academic"
//   });

//   const { title, description, category } = formData;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         "https://student-auth-system-gtb0.onrender.com/api/grievances",
//         formData,
//         {
//           headers: {
//             Authorization: token
//           }
//         }
//       );

//       alert("Grievance Submitted Successfully");

//       setFormData({
//         title: "",
//         description: "",
//         category: "Academic"
//       });

//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Something went wrong"
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Student Grievance Dashboard</h2>

//       <h4 className="mt-4">Submit New Grievance</h4>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Enter Title"
//           className="form-control mb-3"
//           value={title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Enter Description"
//           className="form-control mb-3"
//           value={description}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="category"
//           className="form-control mb-3"
//           value={category}
//           onChange={handleChange}
//         >
//           <option>Academic</option>
//           <option>Hostel</option>
//           <option>Transport</option>
//           <option>Other</option>
//         </select>

//         <button className="btn btn-primary">
//           Submit Grievance
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic"
  });

  const [grievances, setGrievances] = useState([]);

  const { title, description, category } = formData;

  const token = localStorage.getItem("token");

  const fetchGrievances = async () => {
    try {
      const res = await axios.get(
        "https://student-auth-system-gtb0.onrender.com/api/grievances",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setGrievances(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      fetchGrievances();

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://student-auth-system-gtb0.onrender.com/api/grievances/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Grievance Deleted Successfully");
      fetchGrievances();

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `https://student-auth-system-gtb0.onrender.com/api/grievances/${id}`,
        {
          status: "Resolved"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Grievance Updated Successfully");
      fetchGrievances();

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Student Grievance Dashboard</h2>

      <button
        className="btn btn-danger mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      <h4>Submit New Grievance</h4>

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

      <hr />

      <h4>All Grievances</h4>

      {grievances.map((item) => (
        <div key={item._id} className="card p-3 mb-3">
          <h5>{item.title}</h5>
          <p>{item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Status:</strong> {item.status}</p>

          <button
            className="btn btn-success me-2"
            onClick={() => handleUpdate(item._id)}
          >
            Mark Resolved
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
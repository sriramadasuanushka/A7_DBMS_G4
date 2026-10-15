import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminAddMember() {
  const navigate = useNavigate();

  const [newMember, setNewMember] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    wellnessGoal: "",
    fitnessLevel: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewMember((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create MEMBER login account
      const authResponse = await apiRequest(
        "/api/auth/admin/create-member",
        {
          method: "POST",
          body: JSON.stringify({
            username: newMember.username,
            password: newMember.password,
            email: newMember.email
          })
        }
      );

      // Step 2: Create member profile
      await apiRequest("/api/members", {
        method: "POST",
        body: JSON.stringify({
          userId: authResponse.userId,
          name: newMember.name,
          email: newMember.email,
          phone: newMember.phone,
          age: Number(newMember.age),
          wellnessGoal: newMember.wellnessGoal,
          fitnessLevel: newMember.fitnessLevel
        })
      });

      alert("Member added successfully!");

      navigate("/admin/members");

    } catch (error) {
      console.error("Add member error:", error);

      alert(
        "Failed to add member.\n\n" +
        error.message
      );
    }
  };

  return (
    <div className="admin-dashboard">

      <nav className="admin-navbar">
        <div className="admin-logo">
          Wellness<span>+</span>
        </div>

        <div className="admin-nav-right">
          <span className="admin-role">
            ADMIN
          </span>

          <button
            className="admin-logout"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>
        </div>
      </nav>

      <main className="admin-content">

        <section className="add-member-section">

          <div className="members-list-header">

            <div>
              <span>MEMBER MANAGEMENT</span>

              <h2>
                Add New Member
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Back
            </button>

          </div>

          <form
            className="add-member-form"
            onSubmit={handleAddMember}
          >

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                name="username"
                value={newMember.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={newMember.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={newMember.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                value={newMember.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={newMember.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label>Wellness Goal</label>

              <input
                type="text"
                name="wellnessGoal"
                value={newMember.wellnessGoal}
                onChange={handleChange}
                placeholder="Example: Weight Loss"
              />
            </div>

            <div className="form-group">
              <label>Fitness Level</label>

              <select
                name="fitnessLevel"
                value={newMember.fitnessLevel}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select fitness level
                </option>

                <option value="BEGINNER">
                  Beginner
                </option>

                <option value="INTERMEDIATE">
                  Intermediate
                </option>

                <option value="ADVANCED">
                  Advanced
                </option>
              </select>
            </div>

            <div className="form-actions">

              <button
                type="button"
                onClick={() => navigate("/admin-dashboard")}
              >
                Cancel
              </button>

              <button type="submit">
                Create Member
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default AdminAddMember;
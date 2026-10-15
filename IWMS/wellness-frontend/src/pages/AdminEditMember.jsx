import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminEditMember() {
  const navigate = useNavigate();
  const location = useLocation();

  const member = location.state?.member;

  const [form, setForm] = useState({
    name: member?.name || "",
    email: member?.email || "",
    phone: member?.phone || "",
    age: member?.age || "",
    wellnessGoal: member?.wellnessGoal || "",
    fitnessLevel: member?.fitnessLevel || ""
  });

  if (!member) {
    return (
      <div className="admin-dashboard">
        <main className="admin-content">
          <h2>Member information not found.</h2>

          <button
            onClick={() => navigate("/admin/members")}
          >
            ← Back to Members
          </button>
        </main>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiRequest("/api/members", {
        method: "PUT",
        body: JSON.stringify({
          memberId: member.memberId,
          userId: member.userId,
          name: form.name,
          email: form.email,
          phone: form.phone,
          age: Number(form.age),
          wellnessGoal: form.wellnessGoal,
          fitnessLevel: form.fitnessLevel
        })
      });

      alert("Member updated successfully!");

      navigate("/admin/members");

    } catch (error) {
      console.error("Edit member error:", error);

      alert(
        "Failed to update member.\n\n" +
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
                Edit Member
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/members")}
            >
              ← Back
            </button>

          </div>

          <form
            className="add-member-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>Full Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min="1"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label>Wellness Goal</label>

              <input
                name="wellnessGoal"
                value={form.wellnessGoal}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Fitness Level</label>

              <select
                name="fitnessLevel"
                value={form.fitnessLevel}
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
                onClick={() => navigate("/admin/members")}
              >
                Cancel
              </button>

              <button type="submit">
                Update Member
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default AdminEditMember;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminEditTrainer() {
  const navigate = useNavigate();
  const location = useLocation();

  const trainer = location.state?.trainer;

  const [form, setForm] = useState({
    name: trainer?.name || "",
    email: trainer?.email || "",
    phone: trainer?.phone || "",
    specialization: trainer?.specialization || "",
    experienceYears: trainer?.experienceYears ?? "",
    availability: trainer?.availability || ""
  });

  if (!trainer) {
    return (
      <div className="admin-dashboard">
        <main className="admin-content">

          <h2>
            Trainer information not found.
          </h2>

          <button
            onClick={() => navigate("/admin/trainers")}
          >
            ← Back to Trainers
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
      await apiRequest("/api/trainers", {
        method: "PUT",
        body: JSON.stringify({
          trainerId: trainer.trainerId,
          name: form.name,
          email: form.email,
          phone: form.phone,
          specialization: form.specialization,
          experienceYears: Number(
            form.experienceYears
          ),
          availability: form.availability
        })
      });

      alert("Trainer updated successfully!");

      navigate("/admin/trainers");

    } catch (error) {
      console.error("Edit trainer error:", error);

      alert(
        "Failed to update trainer.\n\n" +
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
              <span>TRAINER MANAGEMENT</span>

              <h2>
                Edit Trainer
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/trainers")}
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
                required
              />
            </div>

            <div className="form-group">
              <label>Specialization</label>

              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>

              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleChange}
                min="0"
                max="50"
                required
              />
            </div>

            <div className="form-group">
              <label>Availability</label>

              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">

              <button
                type="button"
                onClick={() => navigate("/admin/trainers")}
              >
                Cancel
              </button>

              <button type="submit">
                Update Trainer
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default AdminEditTrainer;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminAddTrainer() {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experienceYears: "",
    availability: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTrainer((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiRequest("/api/trainers", {
        method: "POST",
        body: JSON.stringify({
          name: trainer.name,
          email: trainer.email,
          phone: trainer.phone,
          specialization: trainer.specialization,
          experienceYears: Number(
            trainer.experienceYears
          ),
          availability: trainer.availability
        })
      });

      alert("Trainer added successfully!");

      navigate("/admin/trainers");

    } catch (error) {
      console.error("Add trainer error:", error);

      alert(
        "Failed to add trainer.\n\n" +
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
                Add New Trainer
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
                value={trainer.name}
                onChange={handleChange}
                placeholder="Enter trainer name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={trainer.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                name="phone"
                value={trainer.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Specialization</label>

              <input
                name="specialization"
                value={trainer.specialization}
                onChange={handleChange}
                placeholder="Example: Yoga, Cardio"
                required
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>

              <input
                type="number"
                name="experienceYears"
                value={trainer.experienceYears}
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
                value={trainer.availability}
                onChange={handleChange}
                placeholder="Example: 10 AM - 6 PM"
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
                Create Trainer
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  );
}

export default AdminAddTrainer;
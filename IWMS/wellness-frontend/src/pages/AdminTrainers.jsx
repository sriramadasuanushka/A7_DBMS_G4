import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminTrainers() {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrainers = async () => {
    try {
      setLoading(true);

      const data = await apiRequest("/api/trainers");

      setTrainers(data);
    } catch (error) {
      console.error("Unable to load trainers:", error);

      alert(
        "Unable to load trainers.\n\n" +
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const handleDelete = async (trainer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiRequest(
        `/api/trainers/${trainer.trainerId}`,
        {
          method: "DELETE"
        }
      );

      alert("Trainer deleted successfully!");

      loadTrainers();

    } catch (error) {
      console.error("Delete trainer error:", error);

      alert(
        "Failed to delete trainer.\n\n" +
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

        <section className="members-list-section">

          <div className="members-list-header">

            <div>
              <span>TRAINERS</span>

              <h2>
                All Trainers
              </h2>
            </div>

            <div className="management-buttons">

              <button
                onClick={() => navigate("/admin/add-trainer")}
              >
                + Add Trainer
              </button>

              <button
                onClick={() => navigate("/admin-dashboard")}
              >
                ← Back
              </button>

            </div>

          </div>

          {loading ? (
            <p>Loading trainers...</p>
          ) : trainers.length === 0 ? (
            <p>No trainers found.</p>
          ) : (

            <div className="members-table">

              {trainers.map((trainer) => (

                <div
                  className="member-row"
                  key={trainer.trainerId}
                >

                  <div>
                    <strong>
                      {trainer.name}
                    </strong>

                    <span>
                      Trainer ID: {trainer.trainerId}
                    </span>
                  </div>

                  <span>
                    {trainer.email || "No email"}
                  </span>

                  <span>
                    {trainer.specialization ||
                      "No specialization"}
                  </span>

                  <div className="management-buttons">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-trainer/${trainer.trainerId}`,
                          {
                            state: { trainer }
                          }
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(trainer)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminTrainers;
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminAddService() {
  const navigate = useNavigate();

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
              <span>SERVICE MANAGEMENT</span>

              <h2>
                Add New Service
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin/services")}
            >
              ← Back
            </button>

          </div>

          <div style={{
            padding: "35px 10px",
            textAlign: "center"
          }}>

            <h3>
              Service creation
            </h3>

            <p style={{
              color: "#718083",
              marginTop: "10px"
            }}>
              The service fields will be connected to
              the existing Wellness Service API.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminAddService;
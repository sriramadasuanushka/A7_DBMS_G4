import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminNotifications() {
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
              <span>NOTIFICATIONS</span>

              <h2>
                Notification Center
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Back
            </button>

          </div>

          <div style={{
            padding: "45px 15px",
            textAlign: "center"
          }}>

            <div style={{
              fontSize: "48px",
              marginBottom: "15px"
            }}>
              🔔
            </div>

            <h3>
              Kafka Notification System
            </h3>

            <p style={{
              color: "#718083",
              maxWidth: "650px",
              margin: "12px auto",
              lineHeight: "1.7"
            }}>
              Notifications are currently generated through
              the Wellness Service and delivered through
              Kafka to the Notification Service, which sends
              the email notification.
            </p>

            <div
              className="management-buttons"
              style={{
                justifyContent: "center",
                marginTop: "25px"
              }}
            >

              <button
                onClick={() => navigate("/admin-dashboard")}
              >
                ← Back to Dashboard
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminNotifications;
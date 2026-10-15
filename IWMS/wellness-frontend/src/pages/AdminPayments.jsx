import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminPayments() {
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

        <section className="members-list-section">

          <div className="members-list-header">

            <div>
              <span>PAYMENT MANAGEMENT</span>

              <h2>
                Payment Records
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Back
            </button>

          </div>

          <div style={{
            padding: "50px 20px",
            textAlign: "center"
          }}>

            <div style={{
              fontSize: "45px",
              marginBottom: "15px"
            }}>
              💳
            </div>

            <h3>
              Payment Management
            </h3>

            <p style={{
              color: "#718083",
              marginTop: "10px"
            }}>
              Payment records page is ready.
              We will connect it to the existing
              payment API after confirming its endpoint.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminPayments;
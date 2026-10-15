import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const data = await apiRequest("/api/appointments");

      setAppointments(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Unable to load appointments:",
        error
      );

      alert(
        "Unable to load appointments.\n\n" +
        error.message
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

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
              <span>APPOINTMENT MANAGEMENT</span>

              <h2>
                All Appointments
              </h2>
            </div>

            <button
              onClick={() => navigate("/admin-dashboard")}
            >
              ← Back
            </button>

          </div>

          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (

            <div className="members-table">

              {appointments.map((appointment) => (

                <div
                  className="member-row"
                  key={appointment.appointmentId}
                >

                  <div>
                    <strong>
                      Appointment #
                      {appointment.appointmentId}
                    </strong>

                    <span>
                      Member ID:{" "}
                      {appointment.memberId}
                    </span>
                  </div>

                  <span>
                    Trainer ID:{" "}
                    {appointment.trainerId}
                  </span>

                  <span>
                    Service ID:{" "}
                    {appointment.serviceId}
                  </span>

                  <span>
                    {appointment.appointmentDate}
                    {" "}
                    {appointment.appointmentTime}
                  </span>

                  <span>
                    Status:{" "}
                    {appointment.status || "—"}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminAppointments;
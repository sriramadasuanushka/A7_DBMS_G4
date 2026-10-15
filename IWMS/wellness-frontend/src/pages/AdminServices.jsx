import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      setLoading(true);

      const data = await apiRequest("/api/services");

      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Unable to load services:", error);

      alert(
        "Unable to load services.\n\n" +
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
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
              <span>SERVICE MANAGEMENT</span>

              <h2>
                Wellness Services
              </h2>
            </div>

            <div className="management-buttons">

              <button
                onClick={() => navigate("/admin/add-service")}
              >
                + Add Service
              </button>

              <button
                onClick={() => navigate("/admin-dashboard")}
              >
                ← Back
              </button>

            </div>

          </div>

          {loading ? (
            <p>Loading services...</p>
          ) : services.length === 0 ? (
            <p>No services found.</p>
          ) : (

            <div className="members-table">

              {services.map((service, index) => (

                <div
                  className="member-row"
                  key={
                    service.serviceId ||
                    service.id ||
                    index
                  }
                >

                  <div>
                    <strong>
                      {service.name ||
                        service.serviceName ||
                        "Wellness Service"}
                    </strong>

                    <span>
                      Service ID:{" "}
                      {service.serviceId ||
                        service.id ||
                        "—"}
                    </span>
                  </div>

                  <span>
                    {service.description ||
                      service.category ||
                      service.type ||
                      "Wellness service"}
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

export default AdminServices;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [loadingMembers, setLoadingMembers] = useState(false);
  const [loadingTrainers, setLoadingTrainers] = useState(false);

  // ==========================================
  // PROTECT ADMIN DASHBOARD
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const role =
        payload.role ||
        payload.roles?.[0] ||
        "";

      const userRole = String(role).toUpperCase();

      if (userRole !== "ADMIN") {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "Invalid token:",
        error
      );

      localStorage.removeItem("token");
      navigate("/login");
    }

  }, [navigate]);


  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  // ==========================================
  // LOAD MEMBERS
  // Used only for dashboard count
  // ==========================================
  const handleLoadMembers = async () => {

    try {

      setLoadingMembers(true);

      const data = await apiRequest(
        "/api/members"
      );

      setMembers(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Unable to load members:",
        error
      );

      setMembers([]);

    } finally {

      setLoadingMembers(false);

    }
  };


  // ==========================================
  // LOAD TRAINERS
  // Used only for dashboard count
  // ==========================================
  const handleLoadTrainers = async () => {

    try {

      setLoadingTrainers(true);

      const data = await apiRequest(
        "/api/trainers"
      );

      setTrainers(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Unable to load trainers:",
        error
      );

      setTrainers([]);

    } finally {

      setLoadingTrainers(false);

    }
  };


  // ==========================================
  // LOAD DASHBOARD COUNTS
  // ==========================================
  useEffect(() => {

    const loadCounts = async () => {

      await Promise.all([
        handleLoadMembers(),
        handleLoadTrainers()
      ]);

    };

    loadCounts();

  }, []);


  // ==========================================
  // RENDER
  // ==========================================
  return (

    <div className="admin-dashboard">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="admin-navbar">

        <div className="admin-logo">
          Wellness<span>+</span>
        </div>


        <div className="admin-nav-right">

          <span className="admin-role">
            ADMIN
          </span>


          <button
            onClick={handleLogout}
            className="admin-logout"
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ======================================
          HEADER
      ====================================== */}

      <header className="admin-header">

        <div>

          <span className="admin-label">
            ADMIN CONTROL CENTER
          </span>


          <h1>
            Welcome back, <span>Admin.</span>
          </h1>


          <p>
            Manage members, trainers, services,
            appointments and wellness activities
            from one place.
          </p>

        </div>

      </header>


      {/* ======================================
          OVERVIEW / STATISTICS
      ====================================== */}

      <section className="admin-stats">


        {/* MEMBERS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            👥
          </div>


          <div>

            <span>
              Total Members
            </span>


            <h2>
              {
                loadingMembers
                  ? "..."
                  : members.length
              }
            </h2>

          </div>

        </div>


        {/* TRAINERS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            🧑‍🏫
          </div>


          <div>

            <span>
              Total Trainers
            </span>


            <h2>
              {
                loadingTrainers
                  ? "..."
                  : trainers.length
              }
            </h2>

          </div>

        </div>


        {/* APPOINTMENTS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            📅
          </div>


          <div>

            <span>
              Appointments
            </span>


            <h2>
              —
            </h2>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="admin-stat-card">

          <div className="stat-icon">
            🔔
          </div>


          <div>

            <span>
              Notifications
            </span>


            <h2>
              —
            </h2>

          </div>

        </div>

      </section>


      {/* ======================================
          MANAGEMENT SECTION
      ====================================== */}

      <main className="admin-content">


        <div className="admin-section-title">

          <span>
            MANAGEMENT
          </span>


          <h2>
            System Administration
          </h2>


          <p>
            Control the major areas of the
            Wellness+ platform.
          </p>

        </div>


        <div className="admin-management-grid">


          {/* ==================================
              MEMBER MANAGEMENT
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              👥
            </div>


            <h3>
              Member Management
            </h3>


            <p>
              View, add, edit and remove members
              from the wellness system.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/members")
                }
              >
                View Members
              </button>


              <button
                onClick={() =>
                  navigate("/admin/add-member")
                }
              >
                Add Member
              </button>

            </div>

          </div>


          {/* ==================================
              TRAINER MANAGEMENT
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              🧑‍🏫
            </div>


            <h3>
              Trainer Management
            </h3>


            <p>
              Manage trainers, their profiles and
              assigned wellness activities.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/trainers")
                }
              >
                View Trainers
              </button>


              <button
                onClick={() =>
                  navigate("/admin/add-trainer")
                }
              >
                Add Trainer
              </button>

            </div>

          </div>


          {/* ==================================
              SERVICE MANAGEMENT
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              🏋️
            </div>


            <h3>
              Service Management
            </h3>


            <p>
              Manage fitness, yoga, wellness and
              other available services.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/services")
                }
              >
                View Services
              </button>


              <button
                onClick={() =>
                  navigate("/admin/add-service")
                }
              >
                Add Service
              </button>

            </div>

          </div>


          {/* ==================================
              APPOINTMENT MANAGEMENT
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              📅
            </div>


            <h3>
              Appointment Management
            </h3>


            <p>
              View and manage appointments across
              the wellness platform.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/appointments")
                }
              >
                View Appointments
              </button>

            </div>

          </div>


          {/* ==================================
              PAYMENT MANAGEMENT
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              💳
            </div>


            <h3>
              Payment Management
            </h3>


            <p>
              Monitor payment records and
              transaction status.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/payments")
                }
              >
                View Payments
              </button>

            </div>

          </div>


          {/* ==================================
              NOTIFICATIONS
          ================================== */}

          <div className="admin-management-card">

            <div className="management-icon">
              🔔
            </div>


            <h3>
              Notifications
            </h3>


            <p>
              Send notifications and email
              communication to users.
            </p>


            <div className="management-buttons">


              <button
                onClick={() =>
                  navigate("/admin/notifications")
                }
              >
                Send Notification
              </button>

            </div>

          </div>


        </div>

      </main>


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="admin-footer">

        <span>
          Wellness+
        </span>


        <p>
          Integrated Wellness Management System
        </p>

      </footer>

    </div>
  );
}

export default AdminDashboard;
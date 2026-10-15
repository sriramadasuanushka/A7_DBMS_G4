import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDashboard.css";

function TrainerDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Showcase data for frontend design
  const trainer = {
    name: "Vittal",
    specialization: "Yoga & Wellness Trainer",
    phone: "+91 98765 43210",
    email: "trainer@wellness.com",
    experience: "8 Years Experience",
    availability: "Monday - Saturday, 9:00 AM - 6:00 PM",
  };

  const members = [
    {
      id: 1,
      name: "Mamatha",
      age: 20,
      goal: "Weight Loss",
      level: "Beginner",
      plan: "Personal Training",
      startDate: "01 Oct 2026",
      endDate: "31 Dec 2026",
      progress: 68,
      status: "Active",
    },
    {
      id: 2,
      name: "Ananya",
      age: 22,
      goal: "Flexibility",
      level: "Intermediate",
      plan: "Yoga Training",
      startDate: "15 Sep 2026",
      endDate: "15 Dec 2026",
      progress: 82,
      status: "Active",
    },
    {
      id: 3,
      name: "Sneha",
      age: 21,
      goal: "Fitness & Strength",
      level: "Intermediate",
      plan: "Strength Training",
      startDate: "01 Aug 2026",
      endDate: "30 Nov 2026",
      progress: 74,
      status: "Active",
    },
    {
      id: 4,
      name: "Priya",
      age: 24,
      goal: "Stress Management",
      level: "Beginner",
      plan: "Wellness & Yoga",
      startDate: "20 Sep 2026",
      endDate: "20 Dec 2026",
      progress: 56,
      status: "Active",
    },
  ];

  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      member: "Mamatha",
      service: "Personal Training",
      date: "Today",
      status: "Scheduled",
      type: "Training",
    },
    {
      id: 2,
      time: "11:00 AM",
      member: "Ananya",
      service: "Yoga & Flexibility",
      date: "Today",
      status: "Completed",
      type: "Yoga",
    },
    {
      id: 3,
      time: "02:30 PM",
      member: "Sneha",
      service: "Strength Training",
      date: "Today",
      status: "Scheduled",
      type: "Fitness",
    },
    {
      id: 4,
      time: "05:00 PM",
      member: "Priya",
      service: "Wellness Session",
      date: "Today",
      status: "Scheduled",
      type: "Wellness",
    },
  ];

  const trainingPlans = [
    {
      member: "Mamatha",
      goal: "Weight Loss",
      plan: "Personal Training",
      period: "01 Oct - 31 Dec 2026",
      progress: 68,
      status: "Active",
    },
    {
      member: "Ananya",
      goal: "Flexibility",
      plan: "Yoga Training",
      period: "15 Sep - 15 Dec 2026",
      progress: 82,
      status: "Active",
    },
    {
      member: "Sneha",
      goal: "Fitness & Strength",
      plan: "Strength Training",
      period: "01 Aug - 30 Nov 2026",
      progress: 74,
      status: "Active",
    },
    {
      member: "Priya",
      goal: "Stress Management",
      plan: "Wellness & Yoga",
      period: "20 Sep - 20 Dec 2026",
      progress: 56,
      status: "Active",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="trainer-dashboard">

      {/* SIDEBAR */}
      <aside className="trainer-sidebar">

        <div className="trainer-brand">
          <div className="brand-icon">W</div>

          <div>
            <h2>Wellness</h2>
            <span>Trainer Portal</span>
          </div>
        </div>

        {/* Trainer Profile */}
        <div className="trainer-profile-mini">

          <div className="profile-avatar">
            V
          </div>

          <div>
            <strong>Vittal</strong>
            <span>Trainer</span>
          </div>

        </div>

        {/* Navigation */}
        <nav className="trainer-nav">

          <button
            className={
              activeSection === "overview"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActiveSection("overview")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              activeSection === "appointments"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActiveSection("appointments")}
          >
            <span>◷</span>
            My Appointments
            <b>4</b>
          </button>

          <button
            className={
              activeSection === "members"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActiveSection("members")}
          >
            <span>♙</span>
            My Members
            <b>4</b>
          </button>

          <button
            className={
              activeSection === "training"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActiveSection("training")}
          >
            <span>▣</span>
            Training Plans
          </button>

        </nav>

        {/* Logout */}
        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="trainer-main">

        {/* TOP HEADER */}
        <header className="trainer-topbar">

          <div>
            <p className="topbar-label">
              TRAINER DASHBOARD
            </p>

            <h1>
              Welcome back, Vittal 👋
            </h1>

            <p>
              Here's what's happening with your members today.
            </p>
          </div>

          <div className="topbar-actions">

            <div className="date-box">
              <span>Today</span>
              <strong>02 Oct 2026</strong>
            </div>

            <div className="topbar-avatar">
              V
            </div>

            <button
              className="top-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>

        {/* ================= OVERVIEW ================= */}

        {activeSection === "overview" && (
          <>

            {/* STATISTICS */}
            <section className="stats-grid">

              <div className="stat-card">

                <div className="stat-icon blue">
                  ◷
                </div>

                <div>
                  <span>Today's Appointments</span>
                  <strong>4</strong>
                  <small>Scheduled sessions</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon purple">
                  ♙
                </div>

                <div>
                  <span>My Members</span>
                  <strong>4</strong>
                  <small>Under your guidance</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon green">
                  ▣
                </div>

                <div>
                  <span>Active Programs</span>
                  <strong>4</strong>
                  <small>Training programs</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon orange">
                  ✓
                </div>

                <div>
                  <span>Completed Sessions</span>
                  <strong>1</strong>
                  <small>Completed today</small>
                </div>

              </div>

            </section>

            {/* MAIN DASHBOARD GRID */}
            <section className="dashboard-grid">

              {/* APPOINTMENTS */}
              <div className="dashboard-card">

                <div className="card-header">

                  <div>
                    <h2>Today's Appointments</h2>
                    <p>Your schedule for today</p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() =>
                      setActiveSection("appointments")
                    }
                  >
                    View all
                  </button>

                </div>

                <div className="appointment-list">

                  {appointments.map((appointment) => (

                    <div
                      className="appointment-row"
                      key={appointment.id}
                    >

                      <div className="appointment-time">
                        <strong>{appointment.time}</strong>
                        <span>{appointment.date}</span>
                      </div>

                      <div className="appointment-member">

                        <div className="member-avatar">
                          {getInitial(appointment.member)}
                        </div>

                        <div>
                          <strong>
                            {appointment.member}
                          </strong>

                          <span>
                            {appointment.service}
                          </span>
                        </div>

                      </div>

                      <span
                        className={
                          appointment.status === "Completed"
                            ? "status-badge completed"
                            : "status-badge scheduled"
                        }
                      >
                        {appointment.status}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* TRAINER PROFILE */}
              <div className="dashboard-card profile-card">

                <div className="card-header">

                  <div>
                    <h2>My Profile</h2>
                    <p>Your trainer information</p>
                  </div>

                  <span className="profile-status">
                    ● Active
                  </span>

                </div>

                <div className="large-profile">

                  <div className="large-avatar">
                    V
                  </div>

                  <h3>{trainer.name}</h3>

                  <span className="specialization">
                    {trainer.specialization}
                  </span>

                </div>

                <div className="profile-details">

                  <div>
                    <span>Experience</span>
                    <strong>{trainer.experience}</strong>
                  </div>

                  <div>
                    <span>Availability</span>
                    <strong>{trainer.availability}</strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>{trainer.email}</strong>
                  </div>

                </div>

              </div>

            </section>

            {/* MEMBERS */}
            <section className="dashboard-card members-preview">

              <div className="card-header">

                <div>
                  <h2>My Members</h2>
                  <p>
                    Members currently under your guidance
                  </p>
                </div>

                <button
                  className="view-all-btn"
                  onClick={() =>
                    setActiveSection("members")
                  }
                >
                  View all
                </button>

              </div>

              <div className="members-grid">

                {members.map((member) => (

                  <div
                    className="member-card"
                    key={member.id}
                  >

                    <div className="member-card-top">

                      <div className="member-avatar large">
                        {getInitial(member.name)}
                      </div>

                      <span className="member-active">
                        {member.status}
                      </span>

                    </div>

                    <h3>{member.name}</h3>

                    <p>{member.goal}</p>

                    <div className="member-info">

                      <div>
                        <span>Training Plan</span>
                        <strong>{member.plan}</strong>
                      </div>

                      <div>
                        <span>Training Period</span>
                        <strong>
                          {member.startDate} - {member.endDate}
                        </strong>
                      </div>

                    </div>

                    <div className="progress-section">

                      <div className="progress-label">
                        <span>Progress</span>
                        <strong>{member.progress}%</strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${member.progress}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>

          </>
        )}

        {/* ================= APPOINTMENTS ================= */}

        {activeSection === "appointments" && (

          <section className="dashboard-card full-card">

            <div className="card-header">

              <div>
                <h2>My Appointments</h2>
                <p>
                  All your scheduled member sessions
                </p>
              </div>

              <span className="count-pill">
                4 Appointments
              </span>

            </div>

            <div className="appointments-table-wrapper">

              <table className="appointments-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Member</th>
                    <th>Training</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {appointments.map((appointment) => (

                    <tr key={appointment.id}>

                      <td>02 Oct 2026</td>

                      <td>
                        <strong>
                          {appointment.time}
                        </strong>
                      </td>

                      <td>

                        <div className="table-member">

                          <div className="member-avatar">
                            {getInitial(appointment.member)}
                          </div>

                          <strong>
                            {appointment.member}
                          </strong>

                        </div>

                      </td>

                      <td>
                        {appointment.service}
                      </td>

                      <td>
                        <span className="type-pill">
                          {appointment.type}
                        </span>
                      </td>

                      <td>

                        <span
                          className={
                            appointment.status === "Completed"
                              ? "status-badge completed"
                              : "status-badge scheduled"
                          }
                        >
                          {appointment.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        )}

        {/* ================= MEMBERS ================= */}

        {activeSection === "members" && (

          <section className="dashboard-card full-card">

            <div className="card-header">

              <div>
                <h2>My Members</h2>
                <p>
                  People currently under your guidance
                </p>
              </div>

              <span className="count-pill">
                4 Members
              </span>

            </div>

            <div className="members-grid large-grid">

              {members.map((member) => (

                <div
                  className="member-card detailed"
                  key={member.id}
                >

                  <div className="member-card-top">

                    <div className="member-avatar large">
                      {getInitial(member.name)}
                    </div>

                    <span className="member-active">
                      {member.status}
                    </span>

                  </div>

                  <h3>{member.name}</h3>

                  <p>{member.goal}</p>

                  <div className="member-detail-grid">

                    <div>
                      <span>Age</span>
                      <strong>{member.age}</strong>
                    </div>

                    <div>
                      <span>Fitness Level</span>
                      <strong>{member.level}</strong>
                    </div>

                    <div>
                      <span>Training Plan</span>
                      <strong>{member.plan}</strong>
                    </div>

                    <div>
                      <span>Training Period</span>
                      <strong>
                        {member.startDate}
                        <br />
                        to
                        <br />
                        {member.endDate}
                      </strong>
                    </div>

                  </div>

                  <div className="progress-section">

                    <div className="progress-label">
                      <span>Training Progress</span>
                      <strong>{member.progress}%</strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${member.progress}%`,
                        }}
                      ></div>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

        {/* ================= TRAINING PLANS ================= */}

        {activeSection === "training" && (

          <section className="dashboard-card full-card">

            <div className="card-header">

              <div>
                <h2>Training Plans</h2>
                <p>
                  Track the training programs of your members
                </p>
              </div>

            </div>

            <div className="training-plan-list">

              {trainingPlans.map((plan, index) => (

                <div
                  className="training-plan-row"
                  key={index}
                >

                  <div className="plan-member">

                    <div className="member-avatar">
                      {getInitial(plan.member)}
                    </div>

                    <div>
                      <strong>{plan.member}</strong>
                      <span>{plan.goal}</span>
                    </div>

                  </div>

                  <div className="plan-column">
                    <span>Training Plan</span>
                    <strong>{plan.plan}</strong>
                  </div>

                  <div className="plan-column">
                    <span>Training Period</span>
                    <strong>{plan.period}</strong>
                  </div>

                  <div className="plan-progress">

                    <div className="progress-label">
                      <span>Progress</span>
                      <strong>{plan.progress}%</strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${plan.progress}%`,
                        }}
                      ></div>
                    </div>

                  </div>

                  <span className="member-active">
                    {plan.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default TrainerDashboard;
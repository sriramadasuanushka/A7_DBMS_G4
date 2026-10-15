import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./MemberDashboard.css";

function MemberDashboard() {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [services, setServices] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const [progress, setProgress] = useState([]);
  const [progressLoading, setProgressLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const username = payload.sub;

      const userId = await apiRequest(
        `/api/auth/user-id/${encodeURIComponent(username)}`
      );

      const memberData = await apiRequest("/api/members");

      const currentMember = Array.isArray(memberData)
        ? memberData.find(
            (member) =>
              Number(member.userId) === Number(userId)
          )
        : null;

      const [trainerData, serviceData] =
        await Promise.all([
          apiRequest("/api/trainers"),
          apiRequest("/api/services"),
        ]);

      setTrainers(
        Array.isArray(trainerData)
          ? trainerData
          : []
      );

      setServices(
        Array.isArray(serviceData)
          ? serviceData
          : []
      );

      if (currentMember?.memberId) {
        // =========================
        // LOAD PROGRESS
        // =========================

        try {
          const progressData = await apiRequest(
            `/api/progress/member/${currentMember.memberId}`
          );

          setProgress(
            Array.isArray(progressData)
              ? progressData
              : []
          );
        } catch (progressError) {
          console.error(
            "Progress loading error:",
            progressError
          );

          setProgress([]);
        }

        // =========================
        // LOAD DAILY TASKS
        // =========================

        try {
          const taskData = await apiRequest(
            `/api/tasks/member/${currentMember.memberId}`
          );

          setTasks(
            Array.isArray(taskData)
              ? taskData
              : []
          );
        } catch (taskError) {
          console.error(
            "Task loading error:",
            taskError
          );

          setTasks([]);
        }
      } else {
        console.warn(
          "Unable to find current member."
        );

        setProgress([]);
        setTasks([]);
      }
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );

      setTrainers([]);
      setServices([]);
      setProgress([]);
      setTasks([]);
    } finally {
      setProgressLoading(false);
      setTasksLoading(false);
      setLoading(false);
    }
  };

  // =========================
  // COMPLETE DAILY TASK
  // =========================

  const handleCompleteTask = async (taskId) => {
    try {
      setCompletingTask(taskId);

      const updatedTask = await apiRequest(
        `/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.taskId === taskId
            ? updatedTask
            : task
        )
      );

      alert(
        "Task completed successfully! 🎉\n\nA wellness notification has been sent."
      );
    } catch (error) {
      console.error(
        "Task completion error:",
        error
      );

      alert(
        "Unable to complete the task.\n\n" +
          error.message
      );
    } finally {
      setCompletingTask(null);
    }
  };

  // =========================
  // SEMANTIC WELLNESS SEARCH
  // =========================

  const handleSemanticSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    try {
      setSearching(true);
      setSearchResults([]);

      const results = await apiRequest(
        `/api/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      console.log(
        "Semantic search response:",
        results
      );

      let parsedResults = results;

      if (typeof results === "string") {
        try {
          parsedResults = JSON.parse(results);
        } catch (error) {
          console.error(
            "Unable to parse semantic search response:",
            error
          );

          parsedResults = [];
        }
      }

      if (Array.isArray(parsedResults)) {
        setSearchResults(parsedResults);
      } else {
        console.error(
          "Unexpected semantic search response:",
          parsedResults
        );

        setSearchResults([]);
      }
    } catch (error) {
      console.error(
        "Semantic search error:",
        error
      );

      alert(
        "Unable to search wellness recommendations.\n\n" +
          error.message
      );

      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="member-dashboard">
        <div className="member-welcome">
          <h2>Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  // =========================
  // LATEST PROGRESS
  // =========================

  const latestProgress =
    progress.length > 0
      ? [...progress].sort(
          (a, b) =>
            new Date(b.recordedDate) -
            new Date(a.recordedDate)
        )[0]
      : null;

  return (
    <div className="member-dashboard">

      {/* =========================
          TOP BAR
      ========================== */}

      <div className="member-topbar">

        <div className="member-brand">
          <h1>Wellness Hub</h1>

          <p>
            Your personal wellness space
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* =========================
          WELCOME
      ========================== */}

      <section className="member-welcome">

        <h2>
          Welcome back 👋
        </h2>

        <p>
          Explore trainers, wellness services and
          personalized wellness recommendations.
        </p>

      </section>

      {/* =========================
          DAILY PROGRESS BUTTON
      ========================== */}

      <section
        style={{
          margin: "25px 0",
          padding: "28px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #dff7ef, #eef8ff)",
          boxShadow:
            "0 8px 25px rgba(0, 0, 0, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 8px",
              color: "#173b35",
            }}
          >
            Daily Progress 📊
          </h2>

          <p
            style={{
              margin: 0,
              color: "#5d6d69",
              lineHeight: "1.6",
            }}
          >
            Track your daily wellness activities,
            tasks, progress and personalized
            recommendations in one place.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/member/daily-progress")
          }
          style={{
            border: "none",
            borderRadius: "12px",
            padding: "14px 24px",
            background: "#173b35",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
            whiteSpace: "nowrap",
          }}
        >
          View Daily Progress →
        </button>
      </section>

      {/* =========================
          DAILY TASKS
      ========================== */}

      <section className="dashboard-section">

        <h2>
          My Daily Wellness Tasks ✅
        </h2>

        {tasksLoading ? (

          <div className="member-welcome">
            <p>
              Loading your daily tasks...
            </p>
          </div>

        ) : tasks.length === 0 ? (

          <div className="member-welcome">

            <h3>
              No daily tasks assigned
            </h3>

            <p>
              Your wellness tasks will appear here
              when they are assigned.
            </p>

          </div>

        ) : (

          <div className="service-grid">

            {tasks.map((task) => (

              <div
                className="service-card"
                key={task.taskId}
              >

                <div className="card-icon">
                  {task.completed ? "✅" : "🎯"}
                </div>

                <h3>
                  {task.taskName}
                </h3>

                <p className="card-label">
                  Task Date
                </p>

                <p className="card-value">
                  {task.taskDate}
                </p>

                <p className="card-label">
                  Status
                </p>

                <p className="card-value">
                  {task.completed
                    ? "Completed ✓"
                    : "Pending"}
                </p>

                {!task.completed && (

                  <button
                    className="logout-btn"
                    onClick={() =>
                      handleCompleteTask(
                        task.taskId
                      )
                    }
                    disabled={
                      completingTask ===
                      task.taskId
                    }
                  >
                    {completingTask ===
                    task.taskId
                      ? "Completing..."
                      : "Complete Task"}
                  </button>

                )}

                {task.completed && (

                  <p>
                    Great job! Keep going 🌟
                  </p>

                )}

              </div>

            ))}

          </div>

        )}

      </section>

      {/* =========================
          DAILY PROGRESS
      ========================== */}

      <section className="dashboard-section">

        <h2>
          My Daily Progress 📊
        </h2>

        {progressLoading ? (

          <div className="member-welcome">

            <p>
              Loading your progress...
            </p>

          </div>

        ) : latestProgress ? (

          <div className="service-grid">

            <div className="service-card">

              <div className="card-icon">
                ⚖️
              </div>

              <h3>
                Weight
              </h3>

              <p className="card-value">
                {latestProgress.weightKg} kg
              </p>

            </div>

            <div className="service-card">

              <div className="card-icon">
                📏
              </div>

              <h3>
                Height
              </h3>

              <p className="card-value">
                {latestProgress.heightCm} cm
              </p>

            </div>

            <div className="service-card">

              <div className="card-icon">
                ❤️
              </div>

              <h3>
                BMI
              </h3>

              <p className="card-value">
                {latestProgress.bmi}
              </p>

            </div>

            <div className="service-card">

              <div className="card-icon">
                🎯
              </div>

              <h3>
                Fitness Goal
              </h3>

              <p className="card-value">
                {latestProgress.fitnessGoal ||
                  "Not specified"}
              </p>

            </div>

            <div className="service-card">

              <div className="card-icon">
                📅
              </div>

              <h3>
                Last Recorded
              </h3>

              <p className="card-value">
                {latestProgress.recordedDate}
              </p>

            </div>

            <div className="service-card">

              <div className="card-icon">
                📝
              </div>

              <h3>
                Progress Notes
              </h3>

              <p>
                {latestProgress.progressNotes ||
                  "No notes available."}
              </p>

            </div>

          </div>

        ) : (

          <div className="member-welcome">

            <h3>
              No progress recorded yet
            </h3>

            <p>
              Your wellness progress will appear
              here once your first assessment is
              added.
            </p>

          </div>

        )}

      </section>

      {/* =========================
          SEMANTIC WELLNESS SEARCH
      ========================== */}

      <section className="dashboard-section">

        <h2>
          Find Your Wellness Plan 🔎
        </h2>

        <form
          className="wellness-search"
          onSubmit={handleSemanticSearch}
        >

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search diet plans, workouts, weight loss..."
          />

          <button
            type="submit"
            disabled={searching}
          >
            {searching
              ? "Searching..."
              : "Search"}
          </button>

        </form>

        {searchResults.length > 0 && (

          <div className="service-grid">

            {searchResults.map(
              (result, index) => (

                <div
                  className="service-card"
                  key={index}
                >

                  <div className="card-icon">
                    🥗
                  </div>

                  <h3>
                    {result.title ||
                      result.name ||
                      result.content ||
                      "Wellness Recommendation"}
                  </h3>

                  {result.description && (

                    <p>
                      {result.description}
                    </p>

                  )}

                  {result.content &&
                    !result.description && (

                      <p>
                        {result.content}
                      </p>

                    )}

                  {result.score !== undefined && (

                    <p className="card-value">
                      Relevance:{" "}
                      {(
                        Number(result.score) *
                        100
                      ).toFixed(1)}
                      %
                    </p>

                  )}

                  {result.similarity !== undefined && (

                    <p className="card-value">
                      Relevance:{" "}
                      {(
                        Number(result.similarity) *
                        100
                      ).toFixed(1)}
                      %
                    </p>

                  )}

                </div>

              )
            )}

          </div>

        )}

        {!searching &&
          searchQuery &&
          searchResults.length === 0 && (

            <p className="empty-message">
              No matching wellness
              recommendations found.
            </p>

          )}

      </section>

      {/* =========================
          TRAINERS
      ========================== */}

      <section className="dashboard-section">

        <h2>
          Meet Our Trainers
        </h2>

        {trainers.length === 0 ? (

          <p className="empty-message">
            No trainers are currently available.
          </p>

        ) : (

          <div className="trainer-grid">

            {trainers.map((trainer) => (

              <div
                className="trainer-card"
                key={trainer.trainerId}
              >

                <div className="card-icon">
                  🏋️
                </div>

                <h3>
                  {trainer.name}
                </h3>

                <p className="card-label">
                  Specialization
                </p>

                <p className="card-value">
                  {trainer.specialization ||
                    "General Training"}
                </p>

                <p className="card-label">
                  Experience
                </p>

                <p className="card-value">
                  {trainer.experienceYears || 0}
                  {" "}years
                </p>

                <p className="card-label">
                  Availability
                </p>

                <p className="card-value">
                  {trainer.availability ||
                    "Not specified"}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* =========================
          WELLNESS SERVICES
      ========================== */}

      <section className="dashboard-section">

        <h2>
          Wellness Services
        </h2>

        {services.length === 0 ? (

          <p className="empty-message">
            No wellness services are currently
            available.
          </p>

        ) : (

          <div className="service-grid">

            {services.map((service) => (

              <div
                className="service-card"
                key={service.serviceId}
              >

                <div className="card-icon">
                  🌿
                </div>

                <h3>
                  {service.name}
                </h3>

                <p className="card-label">
                  Wellness Service
                </p>

                <p>
                  {service.description}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default MemberDashboard;
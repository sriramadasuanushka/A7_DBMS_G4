import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function DailyProgress({ section = "overview" }) {
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [progress, setProgress] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const [loading, setLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const username = payload.sub;

      const userId = await apiRequest(
        `/api/auth/user-id/${encodeURIComponent(username)}`
      );

      const memberData = await apiRequest(
        "/api/members"
      );

      const currentMember = Array.isArray(memberData)
        ? memberData.find(
            (item) =>
              Number(item.userId) ===
              Number(userId)
          )
        : null;

      setMember(currentMember);

      if (currentMember?.memberId) {
        try {
          const progressData =
            await apiRequest(
              `/api/progress/member/${currentMember.memberId}`
            );

          setProgress(
            Array.isArray(progressData)
              ? progressData
              : []
          );
        } catch (error) {
          console.error(
            "Progress loading error:",
            error
          );
          setProgress([]);
        }

        try {
          const taskData =
            await apiRequest(
              `/api/tasks/member/${currentMember.memberId}`
            );

          setTasks(
            Array.isArray(taskData)
              ? taskData
              : []
          );
        } catch (error) {
          console.error(
            "Tasks loading error:",
            error
          );
          setTasks([]);
        }
      }

      try {
        const trainerData =
          await apiRequest("/api/trainers");

        setTrainers(
          Array.isArray(trainerData)
            ? trainerData
            : []
        );
      } catch (error) {
        console.error(
          "Trainer loading error:",
          error
        );
        setTrainers([]);
      }
    } catch (error) {
      console.error(
        "Daily progress loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COMPLETE TASK
  // ==========================================

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

  // ==========================================
  // SEMANTIC SEARCH
  // ==========================================

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

      let parsedResults = results;

      if (typeof results === "string") {
        try {
          parsedResults = JSON.parse(results);
        } catch {
          parsedResults = [];
        }
      }

      if (Array.isArray(parsedResults)) {
        setSearchResults(parsedResults);
      } else {
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

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const goToSection = (name) => {
    if (name === "overview") {
      navigate("/member/daily-progress");
    } else {
      navigate(`/member/daily-progress/${name}`);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>
          <h2>Loading your daily progress...</h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // LATEST PROGRESS
  // ==========================================

  const latestProgress =
    progress.length > 0
      ? [...progress].sort(
          (a, b) =>
            new Date(b.recordedDate) -
            new Date(a.recordedDate)
        )[0]
      : null;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const taskCompletion =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div style={styles.page}>

      {/* ====================================
          HEADER
      ==================================== */}

      <header style={styles.header}>

        <div>
          <h1 style={styles.logo}>
            Wellness Hub
          </h1>

          <p style={styles.subtitle}>
            Daily Progress
          </p>
        </div>

        <div style={styles.headerButtons}>

          <button
            style={styles.backButton}
            onClick={() =>
              navigate("/member-dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ====================================
          PAGE TITLE
      ==================================== */}

      <section style={styles.hero}>

        <div>
          <p style={styles.smallTitle}>
            YOUR WELLNESS JOURNEY
          </p>

          <h2 style={styles.heroTitle}>
            Daily Progress 📊
          </h2>

          <p style={styles.heroText}>
            Track your wellness activities,
            monitor your progress and discover
            personalized recommendations.
          </p>
        </div>

      </section>

      {/* ====================================
          TASKBAR
      ==================================== */}

      <nav style={styles.taskbar}>

        <button
          style={
            section === "overview"
              ? {
                  ...styles.navButton,
                  ...styles.activeNavButton,
                }
              : styles.navButton
          }
          onClick={() =>
            goToSection("overview")
          }
        >
          <span style={styles.navIcon}>
            🏠
          </span>

          <span>
            Overview
          </span>
        </button>

        <button
          style={
            section === "tasks"
              ? {
                  ...styles.navButton,
                  ...styles.activeNavButton,
                }
              : styles.navButton
          }
          onClick={() =>
            goToSection("tasks")
          }
        >
          <span style={styles.navIcon}>
            🎯
          </span>

          <span>
            Tasks
          </span>
        </button>

        <button
          style={
            section === "progress"
              ? {
                  ...styles.navButton,
                  ...styles.activeNavButton,
                }
              : styles.navButton
          }
          onClick={() =>
            goToSection("progress")
          }
        >
          <span style={styles.navIcon}>
            📊
          </span>

          <span>
            Progress
          </span>
        </button>

        <button
          style={
            section === "wellness"
              ? {
                  ...styles.navButton,
                  ...styles.activeNavButton,
                }
              : styles.navButton
          }
          onClick={() =>
            goToSection("wellness")
          }
        >
          <span style={styles.navIcon}>
            🔎
          </span>

          <span>
            Wellness
          </span>
        </button>

        <button
          style={
            section === "trainers"
              ? {
                  ...styles.navButton,
                  ...styles.activeNavButton,
                }
              : styles.navButton
          }
          onClick={() =>
            goToSection("trainers")
          }
        >
          <span style={styles.navIcon}>
            👨‍🏫
          </span>

          <span>
            Trainers
          </span>
        </button>

      </nav>

      {/* ====================================
          CONTENT
      ==================================== */}

      <main style={styles.content}>

        {/* ==================================
            OVERVIEW
        ================================== */}

        {section === "overview" && (

          <div>

            <div style={styles.sectionHeader}>
              <h2>
                Welcome to Your Daily Progress
              </h2>

              <p>
                Here is a quick summary of
                your wellness activities.
              </p>
            </div>

            <div style={styles.cardGrid}>

              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>
                  🎯
                </div>

                <h3>
                  Today's Tasks
                </h3>

                <strong style={styles.bigNumber}>
                  {tasks.length}
                </strong>

                <p>
                  Total tasks assigned
                </p>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>
                  ✅
                </div>

                <h3>
                  Completed
                </h3>

                <strong style={styles.bigNumber}>
                  {completedTasks}
                </strong>

                <p>
                  Tasks completed
                </p>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>
                  ⏳
                </div>

                <h3>
                  Pending
                </h3>

                <strong style={styles.bigNumber}>
                  {pendingTasks}
                </strong>

                <p>
                  Tasks remaining
                </p>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.cardIcon}>
                  📈
                </div>

                <h3>
                  Completion
                </h3>

                <strong style={styles.bigNumber}>
                  {taskCompletion}%
                </strong>

                <p>
                  Daily task progress
                </p>
              </div>

            </div>

            {latestProgress && (

              <div style={styles.progressSummary}>

                <h2>
                  Latest Wellness Progress
                </h2>

                <div style={styles.miniGrid}>

                  <div>
                    <span>
                      Weight
                    </span>

                    <strong>
                      {latestProgress.weightKg} kg
                    </strong>
                  </div>

                  <div>
                    <span>
                      Height
                    </span>

                    <strong>
                      {latestProgress.heightCm} cm
                    </strong>
                  </div>

                  <div>
                    <span>
                      BMI
                    </span>

                    <strong>
                      {latestProgress.bmi}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Goal
                    </span>

                    <strong>
                      {latestProgress.fitnessGoal ||
                        "Not specified"}
                    </strong>
                  </div>

                </div>

              </div>

            )}

          </div>

        )}

        {/* ==================================
            TASKS
        ================================== */}

        {section === "tasks" && (

          <div>

            <div style={styles.sectionHeader}>
              <h2>
                Daily Wellness Tasks 🎯
              </h2>

              <p>
                Complete your assigned wellness
                activities and keep your routine
                on track.
              </p>
            </div>

            {tasks.length === 0 ? (

              <div style={styles.emptyCard}>
                <h3>
                  No tasks assigned
                </h3>

                <p>
                  Your wellness tasks will
                  appear here when they are
                  assigned.
                </p>
              </div>

            ) : (

              <div style={styles.cardGrid}>

                {tasks.map((task) => (

                  <div
                    key={task.taskId}
                    style={styles.infoCard}
                  >

                    <div style={styles.cardIcon}>
                      {task.completed
                        ? "✅"
                        : "🎯"}
                    </div>

                    <h3>
                      {task.taskName}
                    </h3>

                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {task.taskDate}
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {task.completed
                        ? "Completed ✓"
                        : "Pending"}
                    </p>

                    {!task.completed && (

                      <button
                        style={styles.primaryButton}
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

                      <p style={styles.successText}>
                        Great job! Keep going 🌟
                      </p>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

        {/* ==================================
            PROGRESS
        ================================== */}

        {section === "progress" && (

          <div>

            <div style={styles.sectionHeader}>
              <h2>
                My Wellness Progress 📊
              </h2>

              <p>
                Monitor your latest health and
                wellness measurements.
              </p>
            </div>

            {!latestProgress ? (

              <div style={styles.emptyCard}>
                <h3>
                  No progress recorded yet
                </h3>

                <p>
                  Your wellness progress will
                  appear here once your first
                  assessment is added.
                </p>
              </div>

            ) : (

              <div style={styles.cardGrid}>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
                    ⚖️
                  </div>

                  <h3>
                    Weight
                  </h3>

                  <strong style={styles.bigNumber}>
                    {latestProgress.weightKg}
                  </strong>

                  <p>
                    kilograms
                  </p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
                    📏
                  </div>

                  <h3>
                    Height
                  </h3>

                  <strong style={styles.bigNumber}>
                    {latestProgress.heightCm}
                  </strong>

                  <p>
                    centimeters
                  </p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
                    ❤️
                  </div>

                  <h3>
                    BMI
                  </h3>

                  <strong style={styles.bigNumber}>
                    {latestProgress.bmi}
                  </strong>

                  <p>
                    Body Mass Index
                  </p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
                    🎯
                  </div>

                  <h3>
                    Fitness Goal
                  </h3>

                  <strong style={styles.goalText}>
                    {latestProgress.fitnessGoal ||
                      "Not specified"}
                  </strong>

                  <p>
                    Current wellness goal
                  </p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
                    📅
                  </div>

                  <h3>
                    Last Recorded
                  </h3>

                  <strong style={styles.goalText}>
                    {latestProgress.recordedDate}
                  </strong>

                  <p>
                    Latest assessment
                  </p>
                </div>

                <div style={styles.infoCard}>
                  <div style={styles.cardIcon}>
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

            )}

          </div>

        )}

        {/* ==================================
            WELLNESS
        ================================== */}

        {section === "wellness" && (

          <div>

            <div style={styles.sectionHeader}>
              <h2>
                Wellness Recommendations 🔎
              </h2>

              <p>
                Search for personalized wellness
                content using semantic search.
              </p>
            </div>

            <form
              onSubmit={handleSemanticSearch}
              style={styles.searchBox}
            >

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                placeholder="Try: beginner workout for weight loss"
                style={styles.searchInput}
              />

              <button
                type="submit"
                disabled={searching}
                style={styles.primaryButton}
              >
                {searching
                  ? "Searching..."
                  : "Search"}
              </button>

            </form>

            {searchResults.length > 0 && (

              <div style={styles.cardGrid}>

                {searchResults.map(
                  (result, index) => (

                    <div
                      key={index}
                      style={styles.infoCard}
                    >

                      <div style={styles.cardIcon}>
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

                      {result.score !==
                        undefined && (

                        <strong>
                          Relevance:{" "}
                          {(
                            Number(
                              result.score
                            ) * 100
                          ).toFixed(1)}
                          %
                        </strong>

                      )}

                      {result.similarity !==
                        undefined && (

                        <strong>
                          Relevance:{" "}
                          {(
                            Number(
                              result.similarity
                            ) * 100
                          ).toFixed(1)}
                          %
                        </strong>

                      )}

                    </div>

                  )
                )}

              </div>

            )}

            {!searching &&
              searchQuery &&
              searchResults.length === 0 && (

                <div style={styles.emptyCard}>
                  <h3>
                    No recommendations found
                  </h3>

                  <p>
                    Try another wellness query.
                  </p>
                </div>

              )}

          </div>

        )}

        {/* ==================================
            TRAINERS
        ================================== */}

        {section === "trainers" && (

          <div>

            <div style={styles.sectionHeader}>
              <h2>
                Our Wellness Trainers 👨‍🏫
              </h2>

              <p>
                Explore trainers and their
                specializations.
              </p>
            </div>

            {trainers.length === 0 ? (

              <div style={styles.emptyCard}>
                <h3>
                  No trainers available
                </h3>

                <p>
                  Trainer information could not
                  be loaded.
                </p>
              </div>

            ) : (

              <div style={styles.cardGrid}>

                {trainers.map((trainer) => (

                  <div
                    key={trainer.trainerId}
                    style={styles.infoCard}
                  >

                    <div style={styles.cardIcon}>
                      👨‍🏫
                    </div>

                    <h3>
                      {trainer.name}
                    </h3>

                    <p>
                      <strong>
                        Specialization:
                      </strong>
                    </p>

                    <p>
                      {trainer.specialization ||
                        "General Training"}
                    </p>

                    <p>
                      <strong>
                        Experience:
                      </strong>{" "}
                      {trainer.experienceYears ||
                        0} years
                    </p>

                    <p>
                      <strong>
                        Availability:
                      </strong>
                    </p>

                    <p>
                      {trainer.availability ||
                        "Not specified"}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

      </main>

    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f3faf7 0%, #eef5ff 100%)",
    color: "#18332d",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    paddingBottom: "50px",
  },

  header: {
    background: "#ffffff",
    padding: "18px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    boxShadow:
      "0 3px 15px rgba(0,0,0,0.07)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  logo: {
    margin: 0,
    fontSize: "25px",
    color: "#173b35",
  },

  subtitle: {
    margin: "4px 0 0",
    color: "#71807c",
    fontSize: "14px",
  },

  headerButtons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  backButton: {
    border: "1px solid #d6e4df",
    background: "#ffffff",
    color: "#173b35",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  logoutButton: {
    border: "none",
    background: "#173b35",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  hero: {
    margin: "30px 6% 20px",
    padding: "35px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, #dff7ef, #e8f2ff)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.06)",
  },

  smallTitle: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#5d8178",
    marginBottom: "8px",
  },

  heroTitle: {
    fontSize: "32px",
    margin: "0 0 10px",
    color: "#173b35",
  },

  heroText: {
    margin: 0,
    color: "#61716d",
    maxWidth: "700px",
    lineHeight: "1.6",
  },

  taskbar: {
    margin: "20px 6%",
    padding: "10px",
    background: "#ffffff",
    borderRadius: "18px",
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    boxShadow:
      "0 6px 22px rgba(0,0,0,0.08)",
    position: "sticky",
    top: "82px",
    zIndex: 9,
  },

  navButton: {
    flex: "1 0 auto",
    minWidth: "120px",
    border: "none",
    background: "transparent",
    color: "#60716d",
    padding: "14px 18px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },

  activeNavButton: {
    background: "#173b35",
    color: "#ffffff",
    boxShadow:
      "0 5px 15px rgba(23,59,53,0.25)",
  },

  navIcon: {
    fontSize: "21px",
  },

  content: {
    margin: "30px 6%",
  },

  sectionHeader: {
    marginBottom: "24px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
  },

  infoCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow:
      "0 7px 22px rgba(0,0,0,0.07)",
    minHeight: "160px",
  },

  cardIcon: {
    fontSize: "32px",
    marginBottom: "12px",
  },

  bigNumber: {
    display: "block",
    fontSize: "30px",
    margin: "12px 0 4px",
    color: "#173b35",
  },

  goalText: {
    display: "block",
    marginTop: "12px",
    color: "#173b35",
    fontSize: "18px",
  },

  progressSummary: {
    marginTop: "25px",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow:
      "0 7px 22px rgba(0,0,0,0.07)",
  },

  miniGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "18px",
    marginTop: "18px",
  },

  emptyCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow:
      "0 7px 22px rgba(0,0,0,0.07)",
  },

  primaryButton: {
    border: "none",
    background: "#173b35",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
  },

  successText: {
    color: "#218c62",
    fontWeight: "600",
  },

  searchBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "25px",
    boxShadow:
      "0 7px 22px rgba(0,0,0,0.07)",
  },

  searchInput: {
    flex: 1,
    minWidth: "250px",
    border: "1px solid #d6e4df",
    borderRadius: "10px",
    padding: "13px 15px",
    fontSize: "15px",
    outline: "none",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default DailyProgress;
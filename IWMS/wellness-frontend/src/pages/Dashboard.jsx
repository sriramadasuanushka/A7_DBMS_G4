import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const role =
        payload.role ||
        payload.roles?.[0] ||
        "MEMBER";

      const userRole = String(role).toUpperCase();

      console.log("Logged-in role:", userRole);

      if (userRole === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (userRole === "TRAINER") {
        navigate("/trainer-dashboard");
      } else {
        navigate("/member-dashboard");
      }

    } catch (error) {
      console.error("Unable to read JWT:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      Loading dashboard...
    </div>
  );
}

export default Dashboard;
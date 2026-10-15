import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./AdminDashboard.css";

function AdminMembers() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    try {
      setLoading(true);

      const data = await apiRequest("/api/members");

      setMembers(data);
    } catch (error) {
      console.error("Unable to load members:", error);

      alert(
        "Unable to load members.\n\n" +
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      // Delete member profile
      await apiRequest(
        `/api/members/${member.memberId}`,
        {
          method: "DELETE"
        }
      );

      // Delete login account
      if (member.userId) {
        await apiRequest(
          `/api/auth/admin/delete-user/${member.userId}`,
          {
            method: "DELETE"
          }
        );
      }

      alert(
        "Member and login account deleted successfully!"
      );

      loadMembers();

    } catch (error) {
      console.error("Delete member error:", error);

      alert(
        "Failed to delete member.\n\n" +
        error.message
      );
    }
  };

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
              <span>MEMBERS</span>

              <h2>
                All Members
              </h2>
            </div>

            <div className="management-buttons">

              <button
                onClick={() => navigate("/admin/add-member")}
              >
                + Add Member
              </button>

              <button
                onClick={() => navigate("/admin-dashboard")}
              >
                ← Back
              </button>

            </div>

          </div>

          {loading ? (
            <p>Loading members...</p>
          ) : members.length === 0 ? (
            <p>No members found.</p>
          ) : (

            <div className="members-table">

              {members.map((member) => (

                <div
                  className="member-row"
                  key={member.memberId}
                >

                  <div>
                    <strong>
                      {member.name}
                    </strong>

                    <span>
                      Member ID: {member.memberId}
                    </span>
                  </div>

                  <span>
                    {member.email || "No email"}
                  </span>

                  <div className="management-buttons">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-member/${member.memberId}`,
                          {
                            state: { member }
                          }
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(member)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminMembers;
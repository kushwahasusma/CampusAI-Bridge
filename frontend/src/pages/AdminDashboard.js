import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const toggleTheme = () => {

    setDarkMode(!darkMode);

    document.body.classList.toggle(
      "dark-mode"
    );

  };

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div
      className={`d-flex ${
        darkMode ? "dark-mode" : ""
      }`}
    >

      {/* Sidebar */}

      <div className="sidebar">

        <h3 className="mb-4">
          👨‍💼 Admin Panel
        </h3>

        <div className="d-grid gap-2">

          <Link
            to="/admin-dashboard"
            className="btn btn-light text-start"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/add-student"
            className="btn btn-light text-start"
          >
            ➕ Add Student
          </Link>

          <Link
            to="/view-students"
            className="btn btn-light text-start"
          >
            👨‍🎓 View Students
          </Link>

          <Link
            to="/assign-task"
            className="btn btn-light text-start"
          >
            📋 Assign Tasks
          </Link>

          <Link
            to="/leaderboard"
            className="btn btn-light text-start"
          >
            🏆 Leaderboard
          </Link>

          <Link
            to="/analytics"
            className="btn btn-light text-start"
          >
            📈 Analytics
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* Main Content */}

      <div
        className="p-4 flex-grow-1"
        style={{
          marginLeft: "280px"
        }}
      >

        {/* Navbar */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold mb-0">
              Admin Dashboard
            </h2>

            <small className="text-muted">
              Administration Portal
            </small>

          </div>

          <div className="d-flex align-items-center gap-3">

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={toggleTheme}
            >
              {
                darkMode
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"
              }
            </button>

            <span className="fw-bold">
              Welcome Admin 👋
            </span>

          </div>

        </div>

        {/* Banner */}

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2>
              👨‍💼 Admin Dashboard
            </h2>

            <p className="text-muted mb-0">
              Manage Students, Tasks,
              Analytics, Rankings &
              Placement Activities
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Total Students
                </h5>

                <h2>
                  👨‍🎓
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Tasks Assigned
                </h5>

                <h2>
                  📋
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Top Rank
                </h5>

                <h2>
                  🏆
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* Info */}

        <div className="alert alert-info">

          Analytics, Leaderboard,
          Student Management and
          Task Assignment Modules
          are Ready.

        </div>

        {/* Footer */}

        <div
          className="text-center text-muted"
          style={{
            marginTop: "250px",
            paddingBottom: "20px"
          }}
        >

          <hr />

          <p>

            © 2026 Campus AI Admin Portal |
            Student Management &
            Analytics System

          </p>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;
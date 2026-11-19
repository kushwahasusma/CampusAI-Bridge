import React, {useState,useEffect} from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {


  const [darkMode, setDarkMode] =
    useState(false);

    const [student, setStudent] =
  useState({
    xp: 0,
    level: 1,
    rank: "Beginner",
    tasks: []
  });

const userId =
  localStorage.getItem(
    "userId"
  );


  useEffect(() => {

  loadStudent();

}, []);

const loadStudent =
  async () => {

    try {

      const res =
        await API.get(
          `/api/students/profile/${userId}`
        );

      if (res.data) {

        setStudent(
          res.data
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  const toggleTheme = () => {

    setDarkMode(!darkMode);

    document.body.classList.toggle(
      "dark-mode"
    );

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
          🎓 Campus AI
        </h3>

        <div className="d-grid gap-2">

          <Link
            to="/student-profile"
            className="btn btn-light text-start"
          >
            👨‍🎓 Student Profile
          </Link>

          <Link
            to="/skill-gap"
            className="btn btn-light text-start"
          >
            📊 Skill Gap Analysis
          </Link>

          <Link
            to="/placement-score"
            className="btn btn-light text-start"
          >
            📈 Placement Score
          </Link>

          <Link
            to="/job-recommendation"
            className="btn btn-light text-start"
          >
            💼 Job Recommendation
          </Link>

          <Link
            to="/ai-eligibility"
            className="btn btn-light text-start"
          >
            🤖 AI Eligibility
          </Link>

          <Link
            to="/resume-analyzer"
            className="btn btn-light text-start"
          >
            📄 Resume Analyzer
          </Link>

          <Link
            to="/ai-mock-interview"
            className="btn btn-light text-start"
          >
            🎤 AI Mock Interview
          </Link>

          <Link
  to="/"
  className="btn btn-danger mt-3"
>
  🚪 Logout
</Link>

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
              Dashboard
            </h2>

            <small className="text-muted">
              Student Portal
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
              Welcome Student 👋
            </span>

          </div>

        </div>

        {/* Banner */}

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2>
              🚀 Campus AI Skill Bridge
            </h2>

            <p className="text-muted mb-0">
              Smart Placement Preparation &
              Career Guidance Platform
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-3 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>XP</h5>

               <h2>
  {student.xp || 0}
</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>Level</h5>

                <h2>
  {student.level || 1}
</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>Tasks</h5>

                <h2>
  {
    student.tasks?.length || 0
  }
</h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>Rank</h5>

               <h5>
  {
    student.rank ||
    "Beginner"
  }
</h5>

              </div>

            </div>

          </div>

        </div>

        {/* Features */}

        <div className="row">

          <div className="col-md-4 mb-3">

            <div className="card shadow h-100">

              <div className="card-body">

                <h5 className="text-primary">
                  🤖 AI Features
                </h5>

                <hr />

                <ul>
                  <li>Skill Gap Analysis</li>
                  <li>AI Eligibility Checker</li>
                  <li>AI Mock Interview</li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow h-100">

              <div className="card-body">

                <h5 className="text-success">
                  📈 Placement Tools
                </h5>

                <hr />

                <ul>
                  <li>Placement Score</li>
                  <li>Job Recommendation</li>
                  <li>Resume Analysis</li>
                </ul>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow h-100">

              <div className="card-body">

                <h5 className="text-warning">
                  👨‍🎓 Student Progress
                </h5>

                <hr />

                <ul>
                  <li>Profile Management</li>
                  <li>XP & Level System</li>
                  <li>Tasks & Notifications</li>
                </ul>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="text-center mt-5 text-muted">

          <hr />

          <p>
            © 2026 Campus AI Skill Bridge |
            AI-Powered Placement Preparation Platform
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
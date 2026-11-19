import React, { useState } from "react";
import API from "../services/api";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("Software Developer");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeText.trim()) {
      setError("Please paste your resume content.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await API.post(
        "/api/ai/resume-analyzer",
        {
          resumeText: resumeText.trim(),
          jobRole: jobRole.trim(),
        }
      );

      console.log("RESUME ANALYSIS:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("RESUME ANALYZER ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to analyze the resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderList = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p className="text-muted">No information available.</p>;
    }

    return (
      <ul className="mb-0">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">
          📄 AI Resume Analyzer
        </h2>

        <p className="text-muted">
          Analyze your resume, check your ATS score and
          discover areas for improvement.
        </p>
      </div>

      {/* Input */}
      <div className="card shadow mb-4">
        <div className="card-body">

          <h4 className="mb-3">
            📝 Resume Details
          </h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Target Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            rows="14"
            placeholder={`Paste your resume here...

Example:

Name: Sushma
Education: B.Tech CSE
Skills: HTML, CSS, JavaScript, React, Node.js, MongoDB
Projects: Campus AI Bridge
Internships: AI/ML Internship
Certifications: Python, MERN Stack`}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          {error && (
            <div className="alert alert-danger">
              ❌ {error}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "🤖 Analyzing Resume..."
              : "🚀 Analyze Resume"}
          </button>

        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* ATS Score */}
          <div className="card shadow mb-4">
            <div className="card-body text-center">

              <h4>
                📊 ATS Resume Score
              </h4>

              <h1 className="display-2 text-primary fw-bold">
                {result.atsScore}
              </h1>

              <p className="text-muted">
                ATS Score out of 100
              </p>

            </div>
          </div>

          {/* Strengths */}
          <div className="card shadow mb-4">
            <div className="card-body">

              <h4>
                💪 Resume Strengths
              </h4>

              <hr />

              {renderList(result.strengths)}

            </div>
          </div>

          {/* Weaknesses */}
          <div className="card shadow mb-4">
            <div className="card-body">

              <h4>
                ⚠️ Weaknesses
              </h4>

              <hr />

              {renderList(result.weaknesses)}

            </div>
          </div>

          {/* Missing Skills */}
          <div className="card shadow mb-4">
            <div className="card-body">

              <h4>
                📚 Missing Skills
              </h4>

              <hr />

              {renderList(result.missingSkills)}

            </div>
          </div>

          {/* Improvements */}
          <div className="card shadow mb-4">
            <div className="card-body">

              <h4>
                💡 Recommended Improvements
              </h4>

              <hr />

              {renderList(result.improvements)}

            </div>
          </div>

          {/* Keywords */}
          <div className="card shadow mb-4">
            <div className="card-body">

              <h4>
                🔑 Recommended ATS Keywords
              </h4>

              <hr />

              {renderList(result.keywords)}

            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="text-center mt-5 text-muted">

        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          AI-Powered Resume Analysis System
        </p>

      </div>

    </div>
  );
}

export default ResumeAnalyzer;
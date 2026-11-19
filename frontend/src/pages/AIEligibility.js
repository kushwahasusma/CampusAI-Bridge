import React, { useState } from "react";
import API from "../services/api";

function AIEligibility() {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal.trim() || !skills.trim()) {
      setError("Please enter your career goal and skills.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await API.post(
        "/api/ai/ai-eligibility",
        {
          goal: goal.trim(),
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }
      );

      console.log("AI ELIGIBILITY RESPONSE:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("AI ELIGIBILITY ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to check AI eligibility."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderList = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <p className="text-muted">
          No information available.
        </p>
      );
    }

    return (
      <ul className="mb-0">
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "object"
              ? item.name ||
                item.skill ||
                item.title ||
                JSON.stringify(item)
              : item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="mb-4">

        <h2 className="fw-bold">
          🎯 AI Eligibility Checker
        </h2>

        <p className="text-muted">
          Check how well your current skills match
          your desired career goal.
        </p>

      </div>

      {/* Input Card */}
      <div className="card shadow mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            🔍 Enter Your Career Details
          </h4>

          <label className="fw-bold mb-2">
            Career Goal
          </label>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Example: Full Stack Developer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <label className="fw-bold mb-2">
            Current Skills
          </label>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Example: HTML, CSS, JavaScript, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
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
              ? "🤖 Analyzing Eligibility..."
              : "🚀 Check Eligibility"}
          </button>

        </div>
      </div>

      {/* Results */}
      {result && (
        <>

          {/* Eligibility Score */}
          <div className="card shadow mb-4">

            <div className="card-body text-center">

              <h4>
                🎯 Eligibility Score
              </h4>

              <h1 className="display-2 text-primary fw-bold">
                {result.score ??
                  result.eligibilityScore ??
                  result.matchScore ??
                  "N/A"}
              </h1>

              <p className="text-muted">
                Based on your current skills
              </p>

            </div>
          </div>

          {/* Eligibility Status */}
          <div className="card shadow mb-4">

            <div className="card-body text-center">

              <h4>
                🏆 Eligibility Status
              </h4>

              <h2 className="text-success">
                {result.status ??
                  result.eligibility ??
                  result.message ??
                  "Analysis Complete"}
              </h2>

            </div>
          </div>

          {/* Missing Skills */}
          <div className="card shadow mb-4">

            <div className="card-body">

              <h4>
                📚 Skills You Should Learn
              </h4>

              <hr />

              {renderList(
                result.missingSkills ||
                  result.requiredSkills ||
                  result.recommendedSkills
              )}

            </div>
          </div>

          {/* Recommendations */}
          <div className="card shadow mb-4">

            <div className="card-body">

              <h4>
                💡 AI Recommendations
              </h4>

              <hr />

              {renderList(
                result.recommendations ||
                  result.suggestions ||
                  result.nextSteps
              )}

            </div>
          </div>

        </>
      )}

      {/* Footer */}
      <div className="text-center mt-5 text-muted">

        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          AI-Powered Eligibility Evaluation System
        </p>

      </div>

    </div>
  );
}

export default AIEligibility;
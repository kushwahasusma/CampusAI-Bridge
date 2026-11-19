import React, { useState } from "react";
import API from "../services/api";

function JobRecommendation() {
  const [branch, setBranch] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [preferredRole, setPreferredRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!branch.trim() || !skills.trim()) {
      setError("Please enter your branch and skills.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await API.post(
        "/api/ai/job-recommendation",
        {
          branch: branch.trim(),
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          experience,
          preferredRole: preferredRole.trim(),
        }
      );

      console.log("JOB RECOMMENDATION RESPONSE:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("JOB RECOMMENDATION ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to generate job recommendations."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">
          💼 AI Job Recommendation
        </h2>

        <p className="text-muted">
          Discover job roles that match your skills,
          education and career interests.
        </p>
      </div>

      {/* Input Card */}
      <div className="card shadow mb-4">
        <div className="card-body">

          <h4 className="mb-3">
            🔍 Enter Your Details
          </h4>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Branch - CSE"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Skills - React, JavaScript, MongoDB"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <select
            className="form-control mb-3"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="Fresher">Fresher</option>
            <option value="Intern">Intern</option>
            <option value="0-1 Years">0-1 Years Experience</option>
            <option value="1-3 Years">1-3 Years Experience</option>
          </select>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Preferred Role - Full Stack Developer"
            value={preferredRole}
            onChange={(e) => setPreferredRole(e.target.value)}
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
              ? "🤖 Finding Best Jobs..."
              : "🚀 Find Recommended Jobs"}
          </button>

        </div>
      </div>

      {/* Results */}
      {result?.recommendations && (
        <div className="mb-5">

          <h3 className="fw-bold mb-3">
            🎯 Recommended Job Roles
          </h3>

          {result.recommendations.map((job, index) => (
            <div
              className="card shadow mb-3"
              key={index}
            >
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">
                    {job.role}
                  </h4>

                  <span className="badge bg-success fs-6">
                    {job.matchScore}% Match
                  </span>
                </div>

                <hr />

                <p>
                  <strong>Why this role?</strong>
                </p>

                <p className="text-muted">
                  {job.reason}
                </p>

                {Array.isArray(job.requiredSkills) &&
                  job.requiredSkills.length > 0 && (
                    <>
                      <h6 className="fw-bold">
                        🛠 Required Skills
                      </h6>

                      <ul>
                        {job.requiredSkills.map(
                          (skill, skillIndex) => (
                            <li key={skillIndex}>
                              {skill}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}

                {Array.isArray(job.nextSteps) &&
                  job.nextSteps.length > 0 && (
                    <>
                      <h6 className="fw-bold">
                        🚀 Next Steps
                      </h6>

                      <ul>
                        {job.nextSteps.map(
                          (step, stepIndex) => (
                            <li key={stepIndex}>
                              {step}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}

              </div>
            </div>
          ))}

        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-5 text-muted">
        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          AI-Powered Career Recommendation System
        </p>
      </div>

    </div>
  );
}

export default JobRecommendation;
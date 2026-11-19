import React, { useState } from "react";
import axios from "axios";

function SkillGap() {
  const [branch, setBranch] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SKILL GAP BUTTON CLICKED");

    if (!branch.trim() || !skills.trim()) {
      setError("Please enter your branch and skills.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      console.log("Sending request to backend...");

      const response = await axios.post(
        "http://localhost:5000/api/ai/skill-gap",
        {
          branch: branch.trim(),
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0),
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("AI RESPONSE:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("SKILL GAP ERROR:", err);

      if (err.code === "ECONNABORTED") {
        setError(
          "The AI request took too long. Please make sure Ollama and the backend are running."
        );
      } else if (err.response) {
        setError(
          err.response.data?.message ||
            err.response.data?.error ||
            `Server error: ${err.response.status}`
        );
      } else if (err.request) {
        setError(
          "Cannot connect to the backend. Make sure the backend is running on http://localhost:5000."
        );
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderList = (items) => {
    if (!Array.isArray(items)) return null;

    return (
      <ul className="skill-list">
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "object"
              ? item.title || JSON.stringify(item)
              : item}
          </li>
        ))}
      </ul>
    );
  };

  const renderRoadmap = () => {
    if (!result?.learningRoadmap) return null;

    const phases = ["phase1", "phase2", "phase3", "phase4"];

    return (
      <div className="roadmap-section">
        <h2>📚 Learning Roadmap</h2>

        {phases.map((phase) => {
          const phaseData = result.learningRoadmap[phase];

          if (!Array.isArray(phaseData)) return null;

          return (
            <div className="roadmap-phase" key={phase}>
              <h3>
                {phase.replace("phase", "Phase ")}
              </h3>

              {phaseData.map((item, index) => (
                <div className="roadmap-card" key={index}>
                  {typeof item === "object" ? (
                    <>
                      <h4>{item.title || "Learning Phase"}</h4>

                      {item.duration && (
                        <p>
                          <strong>Duration:</strong> {item.duration}
                        </p>
                      )}

                      {Array.isArray(item.topics) &&
                        item.topics.length > 0 && (
                          <>
                            <h5>Topics</h5>
                            {renderList(item.topics)}
                          </>
                        )}

                      {Array.isArray(item.projects) &&
                        item.projects.length > 0 && (
                          <>
                            <h5>Projects</h5>
                            {renderList(item.projects)}
                          </>
                        )}
                    </>
                  ) : (
                    <p>{item}</p>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {Array.isArray(result.learningRoadmap.projects) &&
          result.learningRoadmap.projects.length > 0 && (
            <div className="roadmap-card">
              <h3>🚀 Recommended Projects</h3>
              {renderList(result.learningRoadmap.projects)}
            </div>
          )}

        {Array.isArray(result.learningRoadmap.dailySchedule) &&
          result.learningRoadmap.dailySchedule.length > 0 && (
            <div className="roadmap-card">
              <h3>🗓️ Daily Schedule</h3>

              {result.learningRoadmap.dailySchedule.map(
                (schedule, index) => (
                  <div className="schedule-item" key={index}>
                    {typeof schedule === "object" ? (
                      <>
                        <strong>{schedule.time}</strong>
                        <span>{schedule.activity}</span>
                      </>
                    ) : (
                      <p>{schedule}</p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        .skill-gap-page {
          min-height: 100vh;
          padding: 35px;
          background: #f5f7fb;
          box-sizing: border-box;
        }

        .skill-gap-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .skill-gap-container h1 {
          margin: 0 0 10px;
          font-size: 32px;
          font-weight: 700;
          color: #172033;
        }

        .skill-gap-container > p {
          margin-bottom: 28px;
          color: #687386;
          font-size: 16px;
          line-height: 1.6;
        }

        .skill-gap-container form {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.07);
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #273044;
        }

        .form-group input {
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #d8deea;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s;
        }

        .form-group input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .skill-gap-container form button {
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .skill-gap-container form button:hover {
          background: #4338ca;
        }

        .skill-gap-container form button:disabled {
          background: #9298ad;
          cursor: not-allowed;
        }

        .error-message {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #be123c;
          padding: 15px 18px;
          border-radius: 10px;
          margin-bottom: 25px;
        }

        .result-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .result-section > h2 {
          color: #172033;
          margin: 5px 0;
        }

        .result-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.06);
        }

        .result-card h3 {
          margin-top: 0;
          color: #273044;
        }

        .result-card p {
          color: #596579;
          line-height: 1.7;
        }

        .skill-list {
          margin: 10px 0 0;
          padding-left: 22px;
        }

        .skill-list li {
          margin-bottom: 9px;
          color: #4b5563;
          line-height: 1.5;
        }

        .roadmap-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .roadmap-section > h2 {
          color: #172033;
          margin-bottom: 0;
        }

        .roadmap-phase {
          background: white;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.06);
        }

        .roadmap-phase > h3 {
          margin-top: 0;
          color: #4f46e5;
          font-size: 20px;
        }

        .roadmap-card {
          background: #f8f9fc;
          border: 1px solid #e6e9f0;
          border-radius: 12px;
          padding: 20px;
          margin-top: 14px;
        }

        .roadmap-card h4 {
          margin-top: 0;
          color: #172033;
          font-size: 18px;
        }

        .roadmap-card h5 {
          margin-bottom: 7px;
          color: #374151;
        }

        .schedule-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .schedule-item:last-child {
          border-bottom: none;
        }

        .schedule-item strong {
          color: #4f46e5;
        }

        .schedule-item span {
          color: #596579;
        }

        @media (max-width: 768px) {
          .skill-gap-page {
            padding: 20px;
          }

          .skill-gap-container h1 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="skill-gap-page">
        <div className="skill-gap-container">
          <h1>AI Skill Gap Analysis</h1>

          <p>
            Enter your branch and current skills to discover your
            missing skills, recommended technologies, and personalized
            learning roadmap.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Branch</label>

              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Example: CSE"
              />
            </div>

            <div className="form-group">
              <label>Current Skills</label>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Example: HTML, CSS, JavaScript"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Skill Gap"}
            </button>
          </form>

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {result && (
            <div className="result-section">
              <h2>🤖 AI Analysis Result</h2>

              {Array.isArray(result.missingSkills) &&
                result.missingSkills.length > 0 && (
                  <div className="result-card">
                    <h3>🎯 Missing Skills</h3>
                    {renderList(result.missingSkills)}
                  </div>
                )}

              {Array.isArray(result.recommendedTechnologies) &&
                result.recommendedTechnologies.length > 0 && (
                  <div className="result-card">
                    <h3>💻 Recommended Technologies</h3>
                    {renderList(result.recommendedTechnologies)}
                  </div>
                )}

              {result.placementReadiness && (
                <div className="result-card">
                  <h3>📊 Placement Readiness</h3>
                  <p>{result.placementReadiness}</p>
                </div>
              )}

              {renderRoadmap()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SkillGap;
import React, { useState } from "react";
import API from "../services/api";

function LearningRoadmap() {
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("3 Months");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal.trim() || !skills.trim()) {
      setError("Please enter your career goal and current skills.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      console.log("LEARNING ROADMAP REQUEST STARTED");

      const response = await API.post(
        "/api/ai/learning-roadmap",
        {
          goal: goal.trim(),
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
          duration,
        }
      );

      console.log("LEARNING ROADMAP RESPONSE:", response.data);

      setResult(response.data);
    } catch (err) {
      console.error("LEARNING ROADMAP ERROR:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            err.response.data?.error ||
            "Server error occurred."
        );
      } else if (err.request) {
        setError(
          "Cannot connect to the backend. Make sure the backend is running on port 5000."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderList = (items) => {
    if (!Array.isArray(items)) return null;

    return (
      <ul className="roadmap-list">
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
    if (!result) return null;

    const phases = [
      "phase1",
      "phase2",
      "phase3",
      "phase4",
    ];

    return (
      <div className="roadmap-result">

        <h2>🗺️ Your AI Learning Roadmap</h2>

        {phases.map((phase) => {
          const phaseData = result[phase];

          if (!phaseData) return null;

          return (
            <div className="phase-card" key={phase}>

              <div className="phase-header">
                <h3>
                  {phase.replace("phase", "Phase ")}
                </h3>
              </div>

              {Array.isArray(phaseData) ? (
                phaseData.map((item, index) => (

                  <div className="phase-content" key={index}>

                    {typeof item === "object" ? (
                      <>
                        {item.title && (
                          <h4>{item.title}</h4>
                        )}

                        {item.duration && (
                          <p>
                            <strong>⏱ Duration:</strong>{" "}
                            {item.duration}
                          </p>
                        )}

                        {item.topics && (
                          <>
                            <h5>📚 Topics</h5>
                            {renderList(item.topics)}
                          </>
                        )}

                        {item.projects && (
                          <>
                            <h5>🚀 Projects</h5>
                            {renderList(item.projects)}
                          </>
                        )}
                      </>
                    ) : (
                      <p>{item}</p>
                    )}

                  </div>

                ))
              ) : typeof phaseData === "object" ? (

                <div className="phase-content">

                  {phaseData.title && (
                    <h4>{phaseData.title}</h4>
                  )}

                  {phaseData.duration && (
                    <p>
                      <strong>⏱ Duration:</strong>{" "}
                      {phaseData.duration}
                    </p>
                  )}

                  {phaseData.topics && (
                    <>
                      <h5>📚 Topics</h5>
                      {renderList(phaseData.topics)}
                    </>
                  )}

                  {phaseData.projects && (
                    <>
                      <h5>🚀 Projects</h5>
                      {renderList(phaseData.projects)}
                    </>
                  )}

                </div>

              ) : (
                <div className="phase-content">
                  <p>{phaseData}</p>
                </div>
              )}

            </div>
          );
        })}

        {result.projects && (
          <div className="extra-card">
            <h3>🚀 Recommended Projects</h3>
            {renderList(result.projects)}
          </div>
        )}

        {result.dailySchedule && (
          <div className="extra-card">

            <h3>📅 Daily Study Schedule</h3>

            {Array.isArray(result.dailySchedule) &&
              result.dailySchedule.map(
                (schedule, index) => (

                  <div
                    className="schedule-row"
                    key={index}
                  >
                    {typeof schedule === "object" ? (
                      <>
                        <strong>
                          {schedule.time}
                        </strong>

                        <span>
                          {schedule.activity}
                        </span>
                      </>
                    ) : (
                      <span>{schedule}</span>
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

        .learning-roadmap-page {
          min-height: 100vh;
          padding: 35px;
          background: #f5f7fb;
        }

        .learning-roadmap-container {
          max-width: 1100px;
          margin: auto;
        }

        .learning-roadmap-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .learning-roadmap-header p {
          color: #687386;
          margin-top: 8px;
          margin-bottom: 25px;
        }

        .roadmap-form {
          background: white;
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.07);
          margin-bottom: 25px;
        }

        .roadmap-form-group {
          margin-bottom: 18px;
        }

        .roadmap-form-group label {
          display: block;
          margin-bottom: 7px;
          font-weight: 600;
          color: #273044;
        }

        .roadmap-form-group input,
        .roadmap-form-group select {
          width: 100%;
          padding: 13px;
          border: 1px solid #d8deea;
          border-radius: 10px;
          font-size: 15px;
          box-sizing: border-box;
          outline: none;
        }

        .roadmap-form-group input:focus,
        .roadmap-form-group select:focus {
          border-color: #4f46e5;
        }

        .roadmap-button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #4f46e5;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .roadmap-button:hover {
          background: #4338ca;
        }

        .roadmap-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .roadmap-error {
          background: #fff1f2;
          border: 1px solid #fecdd3;
          color: #be123c;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .roadmap-result {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .roadmap-result > h2 {
          color: #172033;
        }

        .phase-card,
        .extra-card {
          background: white;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.06);
        }

        .phase-header {
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 15px;
        }

        .phase-header h3 {
          color: #4f46e5;
        }

        .phase-content {
          background: #f8f9fc;
          padding: 18px;
          border-radius: 12px;
          margin-top: 12px;
        }

        .phase-content h4 {
          color: #172033;
          margin-top: 0;
        }

        .phase-content h5 {
          color: #374151;
          margin-bottom: 7px;
        }

        .roadmap-list {
          padding-left: 22px;
        }

        .roadmap-list li {
          margin-bottom: 8px;
          color: #596579;
        }

        .schedule-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 13px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .schedule-row:last-child {
          border-bottom: none;
        }

        .schedule-row strong {
          color: #4f46e5;
        }

        .schedule-row span {
          color: #596579;
        }

        @media (max-width: 768px) {
          .learning-roadmap-page {
            padding: 20px;
          }

          .learning-roadmap-header h1 {
            font-size: 26px;
          }
        }

      `}</style>

      <div className="learning-roadmap-page">

        <div className="learning-roadmap-container">

          <div className="learning-roadmap-header">

            <h1>
              🗺️ AI Learning Roadmap
            </h1>

            <p>
              Get a personalized step-by-step learning
              roadmap based on your career goal and
              current skills.
            </p>

          </div>

          <form
            className="roadmap-form"
            onSubmit={handleSubmit}
          >

            <div className="roadmap-form-group">

              <label>
                Career Goal
              </label>

              <input
                type="text"
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                placeholder="Example: Full Stack Developer"
              />

            </div>

            <div className="roadmap-form-group">

              <label>
                Current Skills
              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="Example: HTML, CSS, JavaScript"
              />

            </div>

            <div className="roadmap-form-group">

              <label>
                Learning Duration
              </label>

              <select
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>

            </div>

            <button
              type="submit"
              className="roadmap-button"
              disabled={loading}
            >
              {loading
                ? "🤖 Creating Roadmap..."
                : "🚀 Generate Learning Roadmap"}
            </button>

          </form>

          {error && (
            <div className="roadmap-error">
              ❌ {error}
            </div>
          )}

          {renderRoadmap()}

        </div>

      </div>
    </>
  );
}

export default LearningRoadmap;
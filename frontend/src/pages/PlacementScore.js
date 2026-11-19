import React, { useState } from "react";
import API from "../services/api";

function PlacementScore() {

  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {

    try {

      const res = await API.post(
        "/api/ai/placement-score",
        {
          cgpa,
          skills: skills.split(",")
        }
      );

      setResult(res.data);

    } catch (error) {

      console.log(error);

      alert("Error Calculating Placement Score");

    }

  };

  return (

    <div className="container mt-4">

      {/* Header */}

      <div className="mb-4">

        <h2 className="fw-bold">
          📈 Placement Readiness Score
        </h2>

        <p className="text-muted">
          Calculate Your Placement Readiness Using AI
        </p>

      </div>

      {/* Input Card */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <input
            type="number"
            placeholder="Enter CGPA"
            className="form-control mb-3"
            value={cgpa}
            onChange={(e) =>
              setCgpa(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Skills (React, Java, Python...)"
            className="form-control mb-3"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />

          <button
            className="btn btn-success"
            onClick={handleSubmit}
          >
            🚀 Calculate Score
          </button>

        </div>

      </div>

      {/* Results */}

      {
        result && (

          <>

            {/* Score Card */}

            <div className="card shadow mb-4">

              <div className="card-body text-center">

                <h4>
                  🎯 Placement Score
                </h4>

                <h1 className="text-primary">
                  {result.score}
                </h1>

              </div>

            </div>

            {/* Level Card */}

            <div className="card shadow mb-4">

              <div className="card-body text-center">

                <h4>
                  🏆 Placement Level
                </h4>

                <h2 className="text-success">
                  {result.level}
                </h2>

              </div>

            </div>

            {/* Suggestions */}

            <div className="card shadow mb-4">

              <div className="card-body">

                <h4>
                  💡 Improvement Suggestions
                </h4>

                <ul className="list-group mt-3">

                  {
                    result.suggestions?.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="list-group-item"
                        >
                          {item}
                        </li>

                      )
                    )
                  }

                </ul>

              </div>

            </div>

            {/* Score Guide */}

            <div className="card shadow mb-4">

              <div className="card-body">

                <h4>
                  📊 Score Guide
                </h4>

                <ul>

                  <li>
                    0 - 40 : Beginner
                  </li>

                  <li>
                    41 - 70 : Intermediate
                  </li>

                  <li>
                    71 - 100 : Placement Ready
                  </li>

                </ul>

              </div>

            </div>

          </>

        )
      }

      {/* Footer */}

      <div className="text-center mt-5 text-muted">

        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          AI Placement Readiness Evaluation System
        </p>

      </div>

    </div>

  );

}

export default PlacementScore;
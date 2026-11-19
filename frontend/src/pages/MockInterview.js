import React, { useState } from "react";
import API from "../services/api";

function MockInterview() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role.trim()) {
      setError("Please enter a job role.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setFeedback({});

    try {
      console.log("GENERATING MOCK INTERVIEW");

      const res = await API.post("/api/ai/mock-interview", {
        role: role.trim(),
        difficulty: "Medium",
      });

      console.log("MOCK INTERVIEW RESPONSE:", res.data);

      if (!Array.isArray(res.data.questions)) {
        setError("AI did not return valid questions.");
        return;
      }

      setQuestions(res.data.questions);
    } catch (error) {
      console.error("MOCK INTERVIEW ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to generate interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((previous) => ({
      ...previous,
      [index]: value,
    }));
  };

  const handleEvaluate = async (index) => {
    const questionData = questions[index];

    const questionText =
      typeof questionData === "object"
        ? questionData.question
        : questionData;

    const answerText = answers[index] || "";

    console.log("EVALUATE BUTTON CLICKED");
    console.log("QUESTION:", questionText);
    console.log("ANSWER:", answerText);

    if (!answerText.trim()) {
      setError(`Please enter an answer for Question ${index + 1}.`);
      return;
    }

    setError("");

    setEvaluating((previous) => ({
      ...previous,
      [index]: true,
    }));

    try {
      const res = await API.post("/api/ai/evaluate-answer", {
        question: questionText,
        answer: answerText.trim(),
      });

      console.log("EVALUATION RESPONSE:", res.data);

      setFeedback((previous) => ({
        ...previous,
        [index]: res.data,
      }));
    } catch (error) {
      console.error("EVALUATION ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Answer evaluation failed."
      );
    } finally {
      setEvaluating((previous) => ({
        ...previous,
        [index]: false,
      }));
    }
  };

  const renderList = (items) => {
    if (!Array.isArray(items)) return null;

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "object"
              ? item.title ||
                item.text ||
                item.message ||
                JSON.stringify(item)
              : item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mt-5">

      <div className="mb-4">
        <h2 className="fw-bold">
          🎤 AI Mock Interview
        </h2>

        <p className="text-muted">
          Practice interview questions and receive
          AI-powered feedback on your answers.
        </p>
      </div>

      {/* Interview Setup */}

      <div className="card shadow mb-4">
        <div className="card-body">

          <h4 className="mb-3">
            Interview Setup
          </h4>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter Role (Example: React Developer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
            >
              {loading
                ? "🤖 Generating..."
                : "🚀 Generate Questions"}
            </button>

          </form>

        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          ❌ {error}
        </div>
      )}

      {/* Questions */}

      {questions.length > 0 && (
        <div className="mt-4">

          <h4 className="mb-3">
            📝 Interview Questions
          </h4>

          {questions.map((questionData, index) => {

            const questionText =
              typeof questionData === "object"
                ? questionData.question
                : questionData;

            const currentFeedback = feedback[index];

            return (
              <div
                key={index}
                className="card shadow mb-4"
              >

                <div className="card-body">

                  <h5 className="fw-bold">
                    Q{index + 1}. {questionText}
                  </h5>

                  {typeof questionData === "object" && (
                    <div className="mb-3">

                      {questionData.topic && (
                        <span className="badge bg-info me-2">
                          {questionData.topic}
                        </span>
                      )}

                      {questionData.difficulty && (
                        <span className="badge bg-secondary">
                          {questionData.difficulty}
                        </span>
                      )}

                    </div>
                  )}

                  <hr />

                  <label className="fw-bold mb-2">
                    Your Answer
                  </label>

                  <textarea
                    className="form-control mb-3"
                    rows="5"
                    placeholder="Type your answer here..."
                    value={answers[index] || ""}
                    onChange={(e) =>
                      handleAnswerChange(
                        index,
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={evaluating[index]}
                    onClick={() =>
                      handleEvaluate(index)
                    }
                  >
                    {evaluating[index]
                      ? "🤖 Evaluating..."
                      : "✅ Evaluate Answer"}
                  </button>

                  {/* Evaluation */}

                  {currentFeedback && (
                    <div className="alert alert-primary mt-4">

                      <h5 className="fw-bold">
                        📊 AI Evaluation
                      </h5>

                      <hr />

                      {currentFeedback.score !==
                        undefined && (
                        <div className="mb-3">
                          <h6>🎯 Score</h6>

                          <h2 className="text-primary fw-bold">
                            {currentFeedback.score}/10
                          </h2>
                        </div>
                      )}

                      {currentFeedback.rating && (
                        <div className="mb-3">
                          <h6>🏆 Rating</h6>

                          <h5 className="text-success">
                            {currentFeedback.rating}
                          </h5>
                        </div>
                      )}

                      {currentFeedback.strengths && (
                        <div className="mb-3">
                          <h6>💪 Strengths</h6>

                          {Array.isArray(
                            currentFeedback.strengths
                          )
                            ? renderList(
                                currentFeedback.strengths
                              )
                            : (
                              <p>
                                {currentFeedback.strengths}
                              </p>
                            )}
                        </div>
                      )}

                      {currentFeedback.improvements && (
                        <div className="mb-3">
                          <h6>💡 Improvements</h6>

                          {Array.isArray(
                            currentFeedback.improvements
                          )
                            ? renderList(
                                currentFeedback.improvements
                              )
                            : (
                              <p>
                                {currentFeedback.improvements}
                              </p>
                            )}
                        </div>
                      )}

                      {currentFeedback.idealAnswer && (
                        <div>
                          <h6>⭐ Ideal Answer</h6>

                          <p>
                            {currentFeedback.idealAnswer}
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}

      <div className="text-center mt-5 mb-4 text-muted">

        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          AI-Powered Mock Interview System
        </p>

      </div>

    </div>
  );
}

export default MockInterview;
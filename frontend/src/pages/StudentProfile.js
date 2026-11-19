import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import PageMenu from "../components/PageMenu";

function StudentProfile() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [studentId, setStudentId] = useState(null);

  const [editing, setEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    branch: "",
    cgpa: "",
    skills: "",
    xp: 0,
    level: 1,
    rank: "Beginner",
    tasks: [],
    notifications: []
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const res =
        await API.get(
          `/api/students/profile/${userId}`
        );

      if (res.data) {

        setStudentId(res.data._id);

        setStudent({
          name: res.data.name || "",
          rollNo: res.data.rollNo || "",
          branch: res.data.branch || "",
          cgpa: res.data.cgpa || "",
          skills: res.data.skills?.join(", ") || "",
          xp: res.data.xp || 0,
          level: res.data.level || 1,
          rank: res.data.rank || "Beginner",
          tasks: res.data.tasks || [],
          notifications:
            res.data.notifications || []
        });

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const saveProfile = async () => {

    try {

      const payload = {

        userId,

        name: student.name,

        rollNo: student.rollNo,

        branch: student.branch,

        cgpa: Number(student.cgpa),

        skills: student.skills
          .split(",")
          .map(skill => skill.trim())

      };

      if (studentId) {

        await API.put(
          `/api/students/${studentId}`,
          payload
        );

        alert("Profile Updated");

      } else {

        const res =
          await API.post(
            "/api/students",
            payload
          );

        setStudentId(res.data._id);

        alert("Profile Saved");

      }

      setEditing(false);

      loadProfile();

    } catch (error) {

      console.log(error);

      alert("Save Failed");

    }

  };

  const completeTask = async (taskId) => {

    try {

      await API.put(
        `/api/students/${studentId}/task/${taskId}`
      );

      alert("Task Completed +50 XP");

      loadProfile();

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="container mt-4">

      {/* Header */}

<div className="d-flex justify-content-between align-items-center mb-4">

  <div>

    <h2 className="fw-bold">
      👨‍🎓 Student Profile
    </h2>

    <p className="text-muted">
      Track Skills, XP, Tasks & Placement Progress
    </p>

  </div>

  <PageMenu />

</div>

      {/* Edit Button */}

      <div className="mb-3">

        <button
          className="btn btn-primary"
          onClick={() =>
            setEditing(!editing)
          }
        >
          {
            editing
              ? "Cancel"
              : "Edit Profile"
          }
        </button>

      </div>

      {/* Profile Card */}

<div className="card shadow-lg mb-4 border-0">

  <div className="card-body text-center">

    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Profile"
      width="120"
    />

    <h2 className="mt-3">
      {student.name}
    </h2>

    <h5 className="text-muted">
      {student.branch}
    </h5>

    <p>
      Roll No : {student.rollNo}
    </p>

    <p>
      CGPA : {student.cgpa}
    </p>

    <span className="badge bg-warning me-2 p-2">
      ⭐ Level {student.level}
    </span>

    <span className="badge bg-success p-2">
      🏆 {student.rank}
    </span>

  </div>

</div>

<div className="row mb-4">

  <div className="col-md-4">

    <div className="card shadow">

      <div className="card-body text-center">

        <h5>🏅 Skills</h5>

        <h2>
          {
            student.skills
              .split(",")
              .filter(Boolean)
              .length
          }
        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow">

      <div className="card-body text-center">

        <h5>📋 Tasks</h5>

        <h2>
          {student.tasks.length}
        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow">

      <div className="card-body text-center">

        <h5>🔔 Alerts</h5>

        <h2>
          {student.notifications.length}
        </h2>

      </div>

    </div>

  </div>

</div>

      {/* Placement */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5>
            Placement Readiness
          </h5>

          <div className="progress">

            <div
              className="progress-bar bg-success"
              style={{
                width: "70%"
              }}
            >
              70%
            </div>

          </div>

        </div>

      </div>

      {/* Skills */}

<div className="card shadow mb-4">

  <div className="card-body">

    <h5>
      🏅 Skill Badges
    </h5>

    {
      student.skills
        .split(",")
        .filter(Boolean)
        .map((skill, index) => (

          <span
            key={index}
            className="badge bg-primary me-2 mb-2 p-2"
          >
            🏅 {skill}
          </span>

        ))
    }

  </div>

</div>

      {/* XP */}

<div className="card shadow mb-4">

  <div className="card-body">

    <h5>
      ⚡ XP Progress
    </h5>

    <div className="progress">

      <div
        className="progress-bar bg-primary"
        style={{
          width: `${student.xp % 100}%`
        }}
      >
        {student.xp} XP
      </div>

    </div>

  </div>

</div>

      {/* Rank */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5>Rank</h5>

          <h2>{student.rank}</h2>

        </div>

      </div>

      {/* Tasks */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5>Assigned Tasks</h5>

          {
            student.tasks?.length === 0 ?

            <p>No Tasks Assigned</p>

            :

            student.tasks.map(task => (

              <div
                key={task._id}
                className="d-flex justify-content-between align-items-center mb-2"
              >

                <span>
                  {task.completed ? "✅" : "📌"} {task.title}
                </span>

                {
                  !task.completed &&

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      completeTask(task._id)
                    }
                  >
                    Complete
                  </button>
                }

              </div>

            ))
          }

        </div>

      </div>

      {/* Notifications */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5>
            🔔 Notifications
          </h5>

          {
            student.notifications?.length === 0 ?

            <p>No Notifications</p>

            :

            student.notifications.map(
              (notification, index) => (

                <div
                  key={index}
                  className="alert alert-info"
                >
                  {notification.message}
                </div>

              )
            )
          }

        </div>

      </div>

      {/* Edit Form */}

      {
        editing && (

          <div className="card shadow mb-4">

            <div className="card-body">

              <h4>
                Edit Profile
              </h4>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                name="name"
                value={student.name}
                onChange={handleChange}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Roll Number"
                name="rollNo"
                value={student.rollNo}
                onChange={handleChange}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Branch"
                name="branch"
                value={student.branch}
                onChange={handleChange}
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="CGPA"
                name="cgpa"
                value={student.cgpa}
                onChange={handleChange}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Skills"
                name="skills"
                value={student.skills}
                onChange={handleChange}
              />

              <button
                className="btn btn-success"
                onClick={saveProfile}
              >
                Save / Update Profile
              </button>

            </div>

          </div>

        )
      }

      {/* Footer */}

      <div className="text-center mt-5 text-muted">

        <hr />

        <p>
          © 2026 Campus AI Skill Bridge |
          Student Profile & Career Progress Tracking
        </p>

      </div>

    </div>

  );

}

export default StudentProfile;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";
import LearningRoadmap from "./pages/LearningRoadmap";
/* Authentication */

import Login from "./pages/Login";
import Register from "./pages/Register";

/* Student Pages */

import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import SkillGap from "./pages/SkillGap";
import PlacementScore from "./pages/PlacementScore";
import JobRecommendation from "./pages/JobRecommendation";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import AIEligibility from "./pages/AIEligibility";
import MockInterview from "./pages/MockInterview";
import AIMockInterview from "./pages/AIMockInterview";

/* Admin Pages */

import AdminDashboard from "./pages/AdminDashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import AssignTask from "./pages/AssignTask";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Student Routes */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/student-profile"
          element={<StudentProfile />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        <Route
          path="/placement-score"
          element={<PlacementScore />}
        />
        <Route
  path="/learning-roadmap"
  element={<LearningRoadmap />}
/>
        <Route
          path="/job-recommendation"
          element={<JobRecommendation />}
        />

        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />

        <Route
          path="/ai-eligibility"
          element={<AIEligibility />}
        />

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        <Route
          path="/ai-mock-interview"
          element={<AIMockInterview />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/add-student"
          element={<AddStudent />}
        />

        <Route
          path="/view-students"
          element={<ViewStudents />}
        />

        <Route
          path="/assign-task"
          element={<AssignTask />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
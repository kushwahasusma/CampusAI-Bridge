const express = require("express");

const router = express.Router();

const {
  skillGapAnalysis,
  placementScore,
  learningRoadmap,
  jobRecommendation,
  mockInterview,
  resumeAnalyzer,
  evaluateAnswer,
  aiEligibility
} = require("../controllers/aiController");

router.post("/skill-gap", skillGapAnalysis);

router.post("/placement-score", placementScore);

router.post("/learning-roadmap", learningRoadmap);

router.post("/job-recommendation", jobRecommendation);

router.post("/mock-interview", mockInterview);

router.post("/resume-analyzer", resumeAnalyzer);

router.post("/evaluate-answer", evaluateAnswer);

router.post("/ai-eligibility", aiEligibility);

module.exports = router;
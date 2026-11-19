const { generateResponse } = require("../services/gemmaService");

// =====================================================
// HELPER
// =====================================================

const cleanAIResponse = (response) => {
  if (!response) {
    return "";
  }

  let cleaned = response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Find the first JSON object
  const firstObject = cleaned.indexOf("{");

  // Find the last JSON object
  const lastObject = cleaned.lastIndexOf("}");

  if (firstObject !== -1 && lastObject !== -1) {
    cleaned = cleaned.substring(
      firstObject,
      lastObject + 1
    );
  }

  return cleaned.trim();
};


const parseAIResponse = (response) => {

  const cleaned = cleanAIResponse(response);

  console.log("CLEANED AI RESPONSE LENGTH:", cleaned.length);

  try {

    return JSON.parse(cleaned);

  } catch (error) {

    console.error("AI JSON PARSE ERROR:", error);
    console.error("CLEANED AI RESPONSE:");
    console.error(cleaned);

    return null;
  }
};


// =====================================================
// 1. SKILL GAP ANALYSIS
// =====================================================

const skillGapAnalysis = async (req, res) => {
  console.log("SKILL GAP CONTROLLER REACHED");
  console.log("BODY:", req.body);

  try {
    const { branch, skills } = req.body;

    if (!branch || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Branch and skills are required",
      });
    }

    const prompt = `
You are an expert placement mentor.

Student Branch:
${branch}

Current Skills:
${skills.join(", ")}

Analyze the student's skill gap.

Return ONLY valid JSON:

{
  "missingSkills": [],
  "recommendedTechnologies": [],
  "placementReadiness": "",
  "learningRoadmap": {
    "phase1": [],
    "phase2": [],
    "phase3": [],
    "phase4": [],
    "projects": [],
    "dailySchedule": []
  }
}
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("SKILL GAP ERROR:", error);

    return res.status(500).json({
      message: "Skill gap analysis failed",
      error: error.message,
    });
  }
};


// =====================================================
// 2. PLACEMENT SCORE
// =====================================================

const placementScore = async (req, res) => {
  console.log("PLACEMENT SCORE CONTROLLER REACHED");

  try {
    const { cgpa, skills } = req.body;

    if (!cgpa || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "CGPA and skills are required",
      });
    }

    const prompt = `
You are an expert college placement mentor.

Calculate placement readiness.

CGPA:
${cgpa}

Skills:
${skills.join(", ")}

Return ONLY valid JSON:

{
  "score": 0,
  "level": "",
  "suggestions": []
}

Score must be between 0 and 100.

Level must be:
Beginner
Intermediate
Placement Ready

Give practical suggestions.
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid placement score",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("PLACEMENT SCORE ERROR:", error);

    return res.status(500).json({
      message: "Placement score calculation failed",
      error: error.message,
    });
  }
};


// =====================================================
// 3. LEARNING ROADMAP
// =====================================================

const learningRoadmap = async (req, res) => {
  console.log("LEARNING ROADMAP CONTROLLER REACHED");

  try {
    const { goal, skills, duration } = req.body;

    if (!goal || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Career goal and skills are required",
      });
    }

    const prompt = `
You are an expert career mentor.

Create a personalized learning roadmap.

Career Goal:
${goal}

Current Skills:
${skills.join(", ")}

Duration:
${duration || "3 Months"}

Return ONLY valid JSON:

{
  "phase1": [
    {
      "title": "",
      "duration": "",
      "topics": [],
      "projects": []
    }
  ],
  "phase2": [
    {
      "title": "",
      "duration": "",
      "topics": [],
      "projects": []
    }
  ],
  "phase3": [
    {
      "title": "",
      "duration": "",
      "topics": [],
      "projects": []
    }
  ],
  "phase4": [
    {
      "title": "",
      "duration": "",
      "topics": [],
      "projects": []
    }
  ],
  "projects": [],
  "dailySchedule": [
    {
      "time": "",
      "activity": ""
    }
  ]
}
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid roadmap",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("LEARNING ROADMAP ERROR:", error);

    return res.status(500).json({
      message: "Learning roadmap generation failed",
      error: error.message,
    });
  }
};


// =====================================================
// 4. JOB RECOMMENDATION
// =====================================================

const jobRecommendation = async (req, res) => {
  console.log("JOB RECOMMENDATION CONTROLLER REACHED");

  try {
    const {
      branch,
      skills,
      experience,
      preferredRole,
    } = req.body;

    if (!branch || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Branch and skills are required",
      });
    }

    const prompt = `
You are an AI career advisor.

Recommend suitable job roles for this student.

Branch:
${branch}

Skills:
${skills.join(", ")}

Experience:
${experience || "Fresher"}

Preferred Role:
${preferredRole || "Any suitable role"}

Return ONLY valid JSON:

{
  "recommendations": [
    {
      "role": "",
      "matchScore": 0,
      "requiredSkills": [],
      "reason": "",
      "nextSteps": []
    }
  ]
}

Return 5 suitable job recommendations.
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid job recommendations",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("JOB RECOMMENDATION ERROR:", error);

    return res.status(500).json({
      message: "Job recommendation failed",
      error: error.message,
    });
  }
};


// =====================================================
// 5. RESUME ANALYZER
// =====================================================

const resumeAnalyzer = async (req, res) => {
  console.log("RESUME ANALYZER CONTROLLER REACHED");

  try {
    const { resumeText, jobRole } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const prompt = `
You are an expert ATS resume analyzer.

Analyze the following resume.

Target Job Role:
${jobRole || "Software Developer"}

Resume:
${resumeText}

Return ONLY valid JSON:

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "improvements": [],
  "keywords": []
}

ATS score must be between 0 and 100.
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid resume analysis",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("RESUME ANALYZER ERROR:", error);

    return res.status(500).json({
      message: "Resume analysis failed",
      error: error.message,
    });
  }
};


// =====================================================
// 6. AI ELIGIBILITY
// =====================================================

const aiEligibility = async (req, res) => {
  console.log("AI ELIGIBILITY CONTROLLER REACHED");

  try {
    const { goal, skills } = req.body;

    if (!goal || !Array.isArray(skills)) {
      return res.status(400).json({
        message: "Goal and skills are required",
      });
    }

    const prompt = `
You are an AI placement eligibility advisor.

Career Goal:
${goal}

Current Skills:
${skills.join(", ")}

Determine the student's readiness.

Return ONLY valid JSON:

{
  "eligible": true,
  "eligibilityScore": 0,
  "level": "",
  "strengths": [],
  "missingSkills": [],
  "recommendations": []
}

eligibilityScore must be between 0 and 100.
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid eligibility result",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("AI ELIGIBILITY ERROR:", error);

    return res.status(500).json({
      message: "AI eligibility check failed",
      error: error.message,
    });
  }
};


// =====================================================
// 7. MOCK INTERVIEW
// =====================================================

const mockInterview = async (req, res) => {
  console.log("MOCK INTERVIEW CONTROLLER REACHED");

  try {
    const {
      role,
      difficulty,
      skills,
    } = req.body;

    const prompt = `
You are an expert technical interviewer.

Generate a mock interview.

Role:
${role || "Software Developer"}

Difficulty:
${difficulty || "Medium"}

Skills:
${Array.isArray(skills) ? skills.join(", ") : "General"}

Return ONLY valid JSON:

{
  "questions": [
    {
      "question": "",
      "type": "",
      "difficulty": "",
      "topic": ""
    }
  ]
}

Generate 5 interview questions.
`;

    const aiResponse = await generateResponse(prompt);
    const result = parseAIResponse(aiResponse);

    if (!result) {
      return res.status(500).json({
        message: "AI returned invalid interview questions",
        rawResponse: aiResponse,
      });
    }

    return res.json(result);

  } catch (error) {
    console.error("MOCK INTERVIEW ERROR:", error);

    return res.status(500).json({
      message: "Mock interview generation failed",
      error: error.message,
    });
  }
};


// =====================================================
// 8. EVALUATE ANSWER
// =====================================================

const evaluateAnswer = async (req, res) => {
  console.log("=================================");
  console.log("EVALUATE ANSWER CONTROLLER REACHED");
  console.log("BODY:", req.body);

  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      console.log("QUESTION OR ANSWER MISSING");

      return res.status(400).json({
        message: "Question and answer are required",
      });
    }

    console.log("QUESTION:", question);
    console.log("ANSWER:", answer);
    console.log("PREPARING EVALUATION PROMPT...");

    const prompt = `
You are an expert technical interviewer evaluating a student.

Interview Question:
${question}

Student Answer:
${answer}

Evaluate the student's answer.

Return ONLY valid JSON.
Do not use markdown.
Do not write anything before or after the JSON.

Use exactly this format:

{
  "score": 0,
  "rating": "",
  "strengths": [],
  "improvements": [],
  "idealAnswer": ""
}

Rules:

- score must be a number from 0 to 10
- rating should be one of:
  "Poor"
  "Needs Improvement"
  "Good"
  "Excellent"
- strengths must be an array of strings
- improvements must be an array of strings
- idealAnswer must be a useful sample answer
`;

    console.log("CALLING OLLAMA FOR ANSWER EVALUATION...");

    const aiResponse = await generateResponse(prompt);

    console.log("OLLAMA EVALUATION RESPONSE RECEIVED");
    console.log(aiResponse);

    if (!aiResponse) {
      return res.status(500).json({
        message: "Ollama returned an empty response",
      });
    }

    let result;

    try {
      const cleanedResponse = aiResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      result = JSON.parse(cleanedResponse);

    } catch (parseError) {

      console.error("EVALUATION JSON PARSE ERROR:");
      console.error(parseError);
      console.error("RAW AI RESPONSE:");
      console.error(aiResponse);

      return res.status(500).json({
        message: "AI returned invalid evaluation JSON",
        rawResponse: aiResponse,
      });
    }

    console.log("EVALUATION RESULT:");
    console.log(result);

    return res.status(200).json(result);

  } catch (error) {

    console.error("EVALUATE ANSWER ERROR:");
    console.error(error);

    return res.status(500).json({
      message: "Answer evaluation failed",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  skillGapAnalysis,
  placementScore,
  learningRoadmap,
  jobRecommendation,
  mockInterview,
  resumeAnalyzer,
  evaluateAnswer,
  aiEligibility,
};
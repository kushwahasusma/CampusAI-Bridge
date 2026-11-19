const axios = require("axios");

const generateResponse = async (prompt) => {
  try {
    console.log("OLLAMA REQUEST STARTED");

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: process.env.MODEL_NAME || "gemma3:1b",
        prompt: prompt,
        stream: false,
      },
      {
        timeout: 120000,
      }
    );

    console.log("OLLAMA RESPONSE RECEIVED");

    const aiResponse = response.data?.response;

    if (!aiResponse) {
      throw new Error("Ollama returned an empty response");
    }

    console.log("AI RESPONSE LENGTH:", aiResponse.length);

    return aiResponse;
  } catch (error) {
    console.error("OLLAMA ERROR:", error.message);

    if (error.response) {
      console.error("OLLAMA STATUS:", error.response.status);
      console.error("OLLAMA DATA:", error.response.data);
    }

    throw error;
  }
};

module.exports = { generateResponse };
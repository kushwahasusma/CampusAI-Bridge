const parseGemma = (result) => {

  const cleaned = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);

};

module.exports = parseGemma;
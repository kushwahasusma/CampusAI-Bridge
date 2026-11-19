const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/ai", aiRoutes);
app.use(
  "/api/reports",
  reportRoutes
);

app.get("/", (req, res) => {
  res.send("Campus AI Bridge Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
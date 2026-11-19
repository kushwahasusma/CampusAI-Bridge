const express = require("express");

const router = express.Router();

const {

  getStudents,

  getStudentProfile,

  createStudent,

  updateStudent,

  deleteStudent,

  assignTask,

  completeTask

} = require(
  "../controllers/studentController"
);

// Get All Students

router.get(
  "/",
  getStudents
);

// Get Single Student Profile

router.get(
  "/profile/:userId",
  getStudentProfile
);

// Create Student

router.post(
  "/",
  createStudent
);

// Update Student

router.put(
  "/:id",
  updateStudent
);

// Delete Student

router.delete(
  "/:id",
  deleteStudent
);

// Assign Task

router.post(
  "/:id/task",
  assignTask
);

// Complete Task

router.put(
  "/:id/task/:taskId",
  completeTask
);

module.exports = router;
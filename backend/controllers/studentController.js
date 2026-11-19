const Student = require("../models/Student");

// Get All Students

const getStudents = async (req, res) => {

  try {

    const students =
      await Student.find();

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Get Student Profile

const getStudentProfile =
async (req, res) => {

  try {

    const student =
      await Student.findOne({
        userId: req.params.userId
      });

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Create Student

const createStudent =
async (req, res) => {

  try {

    const student =
      await Student.create({

        ...req.body,

        xp: 0,

        level: 1,

        rank: "Beginner",

tasks: [],

notifications: []
      });

    res.status(201).json(
      student
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Update Student

const updateStudent =
async (req, res) => {

  try {

    const student =
      await Student.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }

      );

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Delete Student

const deleteStudent =
async (req, res) => {

  try {

    await Student.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Student Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Assign Task

const assignTask =
async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );

    if (!student) {

      return res.status(404).json({
        message:
          "Student not found"
      });

    }

student.tasks.push({
  title: req.body.title,
  completed: false
});

student.notifications.push({
  message:
    `New Task Assigned: ${req.body.title}`
});

    student.notifications.push({

      message:
        `New Task Assigned: ${req.body.title}`,

      isRead: false

    });

    await student.save();

    res.json({

      message:
        "Task Assigned Successfully",

      student

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

// Complete Task

const completeTask =
async (req, res) => {

  try {

    const student =
      await Student.findById(
        req.params.id
      );

    const task =
      student.tasks.id(
        req.params.taskId
      );

    task.completed = true;

    student.xp += 50;

    student.level =
      Math.floor(
        student.xp / 100
      ) + 1;

    if (
      student.level >= 10
    ) {

      student.rank =
        "Expert";

    }
    else if (
      student.level >= 5
    ) {

      student.rank =
        "Intermediate";

    }
    else {

      student.rank =
        "Beginner";

    }

    await student.save();

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {

  getStudents,
  getStudentProfile,
  createStudent,
  updateStudent,
  deleteStudent,
  assignTask,
  completeTask

};
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const notificationSchema =
new mongoose.Schema({

  message: String,

  isRead: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const studentSchema =
new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: String,

  rollNo: String,

  branch: String,

  cgpa: Number,

  skills: [String],

  github: String,

  leetcode: String,

  xp: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  rank: {
    type: String,
    default: "Beginner"
  },

  tasks: [taskSchema],

  notifications:
    [notificationSchema]

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Student",
  studentSchema
);
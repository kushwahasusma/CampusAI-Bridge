const express =
require("express");

const router =
express.Router();

const {
  exportStudentReport
} = require(
  "../controllers/reportController"
);

router.get(
  "/students",
  exportStudentReport
);

module.exports =
router;
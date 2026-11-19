const PDFDocument = require("pdfkit");
const Student = require("../models/Student");

const exportStudentReport =
async (req, res) => {

  try {

    const students =
      await Student.find();

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=students-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text(
        "Campus AI Student Report",
        {
          align: "center"
        }
      );

    doc.moveDown();

    students.forEach(
      (student) => {

        doc
          .fontSize(12)
          .text(
            `Name: ${student.name}`
          );

        doc.text(
          `Roll No: ${student.rollNo}`
        );

        doc.text(
          `Branch: ${student.branch}`
        );

        doc.text(
          `CGPA: ${student.cgpa}`
        );

        doc.text(
          `XP: ${student.xp}`
        );

        doc.text(
          `Level: ${student.level}`
        );

        doc.text(
          `Rank: ${student.rank}`
        );

        doc.moveDown();

      }
    );

    doc.end();

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

module.exports = {
  exportStudentReport
};
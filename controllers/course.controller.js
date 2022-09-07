const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Valcourse_numberate request
    if (!req.body.course_number) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create
    const course = {
        dept: req.body.dept,
        description: req.body.description,
        course_number: req.body.course_number,
        level: req.body.level,
        hours: req.body.hours,
        name: req.body.name
    };
    // Save in the database
    Course.create(course)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Course."
        });
        });
};
// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    const course_number = req.query.course_number;
    var condition =course_number ? {course_number: { [Op.like]: `%$course_number}%` } } : null;
    Course.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
};
// Find a single course with a course_number
exports.findOne = (req, res) => {
    const course_number = req.params.course_number;
    Course.findByPk(course_number)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Course with course_number=${course_number}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Course with course_number=" + course_number
        });
      });
};
// Update by the course_number in the request
exports.update = (req, res) => {
    const course_number = req.params.course_number;
    Course.update(req.body, {
      where: { course_number: course_number }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Course with course_number=${course_number}. Maybe Course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Course with course_number=" + course_number
        });
      });
};
// Delete with the specified course_number in the request
exports.delete = (req, res) => {
    const course_number = req.params.course_number;
    Course.destroy({
      where: { course_number: course_number }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Course with course_number=${course_number}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with course_number=" + course_number
        });
      });
};
// Delete all from the database.
exports.deleteAll = (req, res) => {
    Course.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Course(s) were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all courses."
          });
        });
};

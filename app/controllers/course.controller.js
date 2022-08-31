const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;
// Create and Save 
exports.create = (req, res) => {
        // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    // Create
    const course = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
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
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
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
// Find a single course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Course.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Course with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Course with id=" + id
        });
      });
};
// Update by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Course.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Course with id=" + id
        });
      });
};
// Delete with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Course.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with id=" + id
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
          res.send({ message: `${nums} Courses were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all courses."
          });
        });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Course.findAll({ where: { published: true } })
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
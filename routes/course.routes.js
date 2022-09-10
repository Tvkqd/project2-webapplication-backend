module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", courses.create);
    // Retrieve all 
    router.get("/", courses.findAll);
    // Retrieve a single with id
    // Retrieve a single with course_number
    router.get("/:course_number", courses.findOne);
    // Retrieve a single with department
    router.get("/dept/:dept", courses.findDept);
    // Retrieve a single with name
    router.get("/name/:name", courses.findName);
    // Update with course_number
    router.put("/:course_number", courses.update);
    // Delete with course_number
    router.delete("/:course_number", courses.delete);
    // Delete all
    router.delete("/", courses.deleteAll);
    app.use('/courses-t1', router);
  };
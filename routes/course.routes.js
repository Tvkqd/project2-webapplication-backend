module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", courses.create);
    // Retrieve all 
    //router.get("/", courses.findAll);
    // Retrieve a single with id
    router.get("/:course_number", courses.findOne);
    // Update with id
    router.put("/:course_number", courses.update);
    // Delete with id
    router.delete("/:course_number", courses.delete);
    // Delete all
    router.delete("/", courses.deleteAll);
    //app.use('/course-t1', router);
    app.use('/api/courses', router);
  };
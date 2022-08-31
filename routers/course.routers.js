module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();
    // Create 
    router.post("/", courses.create);
    // Retrieve all 
    router.get("/", courses.findAll);
    // Retrieve all published 
    router.get("/published", courses.findAllPublished);
    // Retrieve a single with id
    router.get("/:id", courses.findOne);
    // Update with id
    router.put("/:id", courses.update);
    // Delete with id
    router.delete("/:id", courses.delete);
    // Delete all
    router.delete("/", courses.deleteAll);
    app.use('/api/courses', router);
  };
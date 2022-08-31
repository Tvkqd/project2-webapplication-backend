const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://project2.eaglesoftwareteam.com/project2/2022/t1/:3306"
  //origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Team 1! Test Passed" });
});

//call sync() method
const db = require("./models");
db.sequelize.sync();

//Connecting with database
require("./routers/course.routers")(app)
// set port, listen for requests
const PORT = process.env.PORT || 3306;
//const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
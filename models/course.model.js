module.exports = (sequelize, Sequelize) => {
    const courses = sequelize.define("courses", {
      dept: {
        type: Sequelize.STRING
      },
      course_number: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
    return courses;
  };
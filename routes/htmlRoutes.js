// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {
        loggedIn: false
      });
  });
  // app.get("/index", function(req, res) {
  //   res.render("index", {loggedIn:false});
  // });
  // Load example page and pass in an example by id
  app.get("/completed-stories", function(req, res) {
    db.Story.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("stories", {
        example: dbStory
      });
    });
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("notFound",{
      loggedIn: false
    });
  });
};

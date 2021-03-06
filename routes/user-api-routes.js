var db = require("../models");
module.exports = function(app) {
  // Get all Users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get a user by id
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get a user by email
  app.get("/api/emails/:email", function(req, res) {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  // username check
  app.get("/api/displaynames/:displayname", function(req, res) {
    db.User.findOne({
      attributes: ['displayname'],
      where: {
        displayname: req.params.displayname
      }
    }).then(function(user) {
      res.json(user);
    });
  });
};

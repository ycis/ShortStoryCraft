var exports = module.exports = {}
// const models = require('../models');

// models.foo.find({
//   order: [
//     Sequelize.fn( 'RAND' ),
//   ]
// });

var settings = { 
        loggedIn: false,
        inGame: false,
        sessionLogOut: false
    }
exports.preLogin = function(req, res) {
    settings.login_errors = req.flash('error')
    res.render("index", settings);
    req.session.messages = [];
};

exports.signedin = function(req, res) {
    settings.loggedIn = true;
    res.render("index",settings);
};
var exports = module.exports = {}
var gameOptions = 
  {
    loggedIn: true,
    sessionLogOut: false
  }

exports.welcome = function(req, res) {
  gameOptions.inGame = false;
  res.render('welcome',gameOptions);
};

exports.lobby = function(req, res) {
  gameOptions.inGame = true;
  res.render('lobby',gameOptions);
};
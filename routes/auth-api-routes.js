var authController = require('../controllers/auth-controller.js');
var gameController = require('../controllers/game-controller.js');
var indexController = require('../controllers/index-controller.js');
 
module.exports = function (app, passport) {
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        indexController.preLogin;
    }
    app.get('/index', isLoggedIn, indexController.signedin);
    app.get('/welcome', isLoggedIn, gameController.welcome);
    app.get('/room/*', isLoggedIn, gameController.lobby);
    app.get('/logout', authController.logout);

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/welcome',
            failureRedirect: '/index',
            failureFlash: true
        }
    ));
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/welcome',
        failureRedirect: '/index',
        failureFlash: true
    }
));
}

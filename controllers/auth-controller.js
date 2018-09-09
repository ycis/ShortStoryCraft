var exports = module.exports = {}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.render('index',{
            loggedIn: false,
            inGame: false,
            sessionLogOut: true
        });
    });
};

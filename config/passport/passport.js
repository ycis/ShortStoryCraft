//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // deserialize user 
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });    
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'signup-email',
            passwordField: 'signup-password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message:'That email is already assciated with an account'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        displayname: req.body.displayname
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
    
        function(req, email, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                console.log("debugging passport checkpoint1 ");
                console.log(user);
                if (!user) {
                    // console.log("debugging passport checkpoint2 ");
                    return done(null, false, {
                        message: 'Email not associated with an account'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    // console.log("debugging passport checkpoint3 ");
                    return done(null, false, {
                        message: 'Incorrect password provided.'
                    });
                }
                // console.log("debugging passport checkpoint4 ");
                var userinfo = user.get();
                //Used for debugging purposes
                //console.log(userinfo);
                //return done(userinfo);
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}
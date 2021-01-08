const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const { logger } = require('./logger');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne({ 'email': email }, function(err, user) {
            if (err) return done(err);
            if (user) {
              logger.error('This email has already taken');
              return done(null, false, req.flash('registerMessage', 'This email has already used!'));
            }
            const newUser = new User();
            newUser.email = email;
            newUser.password = password;

            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            })
          })
        })
      }
    )
  )
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ 'email': email }, function(err, user) {
          if (err) return done(err);
          if (!user) {
            logger.error('User not found!');
            return done(null, false, req.flash('loginMessage', 'No account found!'));
          }
          if (!user.comparePassword(password)) {
            logger.error('Wrong password!');
            return done(null, false, req.flash('loginMessage', 'Wrong password!'));
          }
          return done(null, user);
        })
      }
    )
  )
}

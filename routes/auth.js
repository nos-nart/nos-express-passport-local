const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post(
  '/register',
  passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
  }),
  (req, res, next) => {
    // user has been authenticated and been attached to current session
  }
)

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res, next) => {
    // user has been authenticated and been attached to current session
  }
)

module.exports = router;

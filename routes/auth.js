const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}))

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;

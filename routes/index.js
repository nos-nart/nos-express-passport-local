const express = require('express');
const router = express.Router();
const { requiredAuth } = require('../middlewares/authenticate');

router.get('/', requiredAuth, (req, res) => {
  res.render('pages/index', { user: 'test@gmail.com' })
});

router.get('/register', (req, res) => {
  res.render('pages/register', { message: req.flash('registerMesasge') });
});

router.get('/login', (req, res) => {
  res.render('pages/login', { message: req.flash('loginMessage') });
});

module.exports = router;

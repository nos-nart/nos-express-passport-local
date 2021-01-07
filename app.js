require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const expressPino = require('express-pino-logger');
const { errorHandler } = require('./middlewares/error-handler');
require('./config/passport')(passport);

const PORT = process.env.PORT;
const app = express();

const expressLogger = expressPino({
  logger,
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// use express session
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: HOUR,
    sameSite: true,
    secure: process.env.NODE_ENV === 'prod'
  }
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// for flash messages
app.use(flash())
// Routes
app.use('/',require('./routes/index'));
app.use('/auth', require('./routes/auth'));
// set the view engine to ejs
server.set('view engine', 'ejs');
server.set('views', './views');
// Logging
app.use(expressLogger);
// Error handling
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(`Failed try connecting to DB`);
  })

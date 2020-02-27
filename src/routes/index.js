const express = require('express');
const passport = require('passport');
const User = require('../model/userModel');
const logger = require('../core/logger/appLogger');

const router = express.Router();

// Get Introduction page
router.get('/', (req, res) => {
  try {
    res.render('home');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem loading this page. Please try again or contact the developer!',
    });
  }
});

// Get Failure page
router.get('/failure', (req, res) => {
  try {
    res.render('failure');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem. Please try again or contact the developer!',
    });
  }
});

// Return To Home Page if Errors Occur
router.post('/failure', (req, res) => {
  try {
    res.redirect('/');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem. Please try again or contact the developer!',
    });
  }
});

// Get Login Page
router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem loading this page. Please try again or contact the developer!',
    });
  }
});

// Get User Registration page
router.get('/register', (req, res) => {
  try {
    res.render('register');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem loading this page. Please try again or contact the developer!',
    });
  }
});

// Get All Roles page
router.get('/all-roles', (req, res) => {
  try {
    res.render('index');
  } catch (pageLoadError) {
    logger.error(pageLoadError);
    res.status(404).render('failure', {
      message: 'There was a problem loading this page. Please try again or contact the developer!',
    });
  }
});

// When User logs out, return to Introduction page
router.get('/logout', (req, res) => {
  req.logout();
  try {
    res.redirect('/');
  } catch (logOutError) {
    logger.error(logOutError);
    res.status(404).render('failure', {
      message: 'There was a problem logging out of Source Me. Please try again or contact the developer!',
    });
  }
});

// Register new user
router.post('/register', (req, res) => {
  User.register({
    username: req.body.username,
  }, req.body.password, (err) => {
    if (err) {
      logger.error(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/all-roles');
      });
    }
  });
});

// Login user
router.post('/login', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      logger.error(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/all-roles');
      });
    }
  });
});

module.exports = router;

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Get Google Authentication page
router.get('/',
  passport.authenticate('google', {
    scope: ['profile'],
  }));

router.get('/callback',
  passport.authenticate('google', {
    // Failed authentication, redirect to login page
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Successful authentication, redirect to homepage with all roles.
    res.redirect('/all-roles');
  });

module.exports = router;

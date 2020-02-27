require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const logger = require('./core/logger/appLogger');
const loadRolesFromExcel = require('./core/utils/ExcelToJson');
const User = require('./model/userModel');
const index = require('./routes/index');
const auth = require('./routes/auth');
const roles = require('./routes/roles');

// Set Up Logger
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

// Create Express App
const app = express();

// Set up Static Files & Templates
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Set Up Body Parser
app.use(express.urlencoded({
  extended: true,
}));

// Create Session
app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth/google', auth);
app.use('/roles', roles);

// Connect to MongoDB database
const mongoUrl = process.env.DB_CONNECTION_STRING;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

// Make a new user with Google OAuth 2.0
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
((accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({
    googleId: profile.id,
  }, (err, user) => cb(err, user));
})));

// Load Roles into Database
const excelpath = 'Open Roles/OpenRoles.xlsx';
loadRolesFromExcel(excelpath).catch((err) => {
  logger.error(err);
});

app.post('/', (req, res) => {
  const projectRoleId = Number(req.body.projectRoleID);

  const exampleRoleArray = [{
    projectName: 'Project Martyr',
    client: 'Public Sector',
    roleName: 'PMO and RAID management',
    grade: 'Senior Consultant',
    roleDescription: "It's a role!",
    location: 'London',
    startDate: '13 Jan 2020',
    endDate: '31 Dec 2020',
    resourceManagerName: 'Example Resource Manager',
    resourceManagerEmail: 'resource-manager@email.com',
  },
  {
    projectName: 'Project Martyr',
    client: 'Public Sector',
    roleName: 'NFT Manager',
    grade: 'Senior Consultant',
    roleDescription: "It's a role again!",
    location: 'Gibraltar',
    startDate: '19 Jan 2020',
    endDate: '31 Dec 2020',
    resourceManagerName: 'Example Resource Manager',
    resourceManagerEmail: 'resource-manager@email.com',
  }, {
    projectName: 'Project Martyr',
    client: 'Public Sector',
    roleName: 'NFT Analyst',
    grade: 'Analyst',
    roleDescription: "It's a role!",
    location: 'Gibraltar',
    startDate: '19 Jan 2020',
    endDate: '31 Dec 2020',
    resourceManagerName: 'Example Resource Manager',
    resourceManagerEmail: 'resource-manager@email.com',
  },
  ];

  let projectName = '';
  let client = '';
  let roleName = '';
  let grade = '';
  let roleDescription = '';
  let location = '';
  let startDate = '';
  let endDate = '';
  let resourceManagerName = '';
  let resourceManagerEmail = '';

  switch (projectRoleId) {
    case 1:
      projectName = exampleRoleArray[projectRoleId - 1];
      client = exampleRoleArray[projectRoleId - 1];
      roleName = exampleRoleArray[projectRoleId - 1];
      grade = exampleRoleArray[projectRoleId - 1];
      roleDescription = exampleRoleArray[projectRoleId - 1];
      location = exampleRoleArray[projectRoleId - 1];
      startDate = exampleRoleArray[projectRoleId - 1];
      endDate = exampleRoleArray[projectRoleId - 1];
      resourceManagerName = exampleRoleArray[projectRoleId - 1];
      resourceManagerEmail = exampleRoleArray[projectRoleId - 1];
      break;
    case 2:
      projectName = exampleRoleArray[projectRoleId - 1];
      client = exampleRoleArray[projectRoleId - 1];
      roleName = exampleRoleArray[projectRoleId - 1];
      grade = exampleRoleArray[projectRoleId - 1];
      roleDescription = exampleRoleArray[projectRoleId - 1];
      location = exampleRoleArray[projectRoleId - 1];
      startDate = exampleRoleArray[projectRoleId - 1];
      endDate = exampleRoleArray[projectRoleId - 1];
      resourceManagerName = exampleRoleArray[projectRoleId - 1];
      resourceManagerEmail = exampleRoleArray[projectRoleId - 1];
      break;
    case 3:
      projectName = exampleRoleArray[projectRoleId - 1];
      client = exampleRoleArray[projectRoleId - 1];
      roleName = exampleRoleArray[projectRoleId - 1];
      grade = exampleRoleArray[projectRoleId - 1];
      roleDescription = exampleRoleArray[projectRoleId - 1];
      location = exampleRoleArray[projectRoleId - 1];
      startDate = exampleRoleArray[projectRoleId - 1];
      endDate = exampleRoleArray[projectRoleId - 1];
      resourceManagerName = exampleRoleArray[projectRoleId - 1];
      resourceManagerEmail = exampleRoleArray[projectRoleId - 1];
      break;
    default:
      res.redirect('/failure');
  }

  res.render('project', {

    projectName,
    client,
    roleName,
    grade,
    roleDescription,
    location,
    startDate,
    endDate,
    resourceManagerName,
    resourceManagerEmail,
  });
});

// Run Database on localhost:3000
app.listen(3000, () => {
  logger.info('Server running on port 3000');
});

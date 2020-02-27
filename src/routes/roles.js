const express = require('express');
const Role = require('../model/roleModel');
const logger = require('../core/logger/appLogger');

const router = express.Router();

// Get All Roles
router.get('/', (req, res) => {
  Role.find((err, foundRoles) => {
    if (!err) {
      res.send(foundRoles);
      logger.info('Successfully got all roles in database');
    } else {
      res.send(err);
      logger.error(err);
    }
  });
});

// Add a new role manually
router.post('/', (req, res) => {
  const newRole = new Role({
    requestNumber: req.body.requestNumber,
    roleNumber: req.body.roleNumber,
    projectName: req.body.projectName,
    client: req.body.client,
    roleName: req.body.roleName,
    grade: req.body.grade,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    roleDescription: req.body.roleDescription,
    location: req.body.location,
    resourceManagerName: req.body.resourceManagerName,
    resourceManagerEmail: req.body.resourceManagerEmail,
    applied: false,
  });

  newRole.save((err) => {
    if (!err) {
      res.send(`Successfully added the new role ${req.body.requestNumber}-${req.body.roleNumber}`);
      logger.info(`Successfully added the new role ${req.body.requestNumber}-${req.body.roleNumber}`);
    } else {
      res.send(err);
      logger.error(err);
    }
  });
});

// Delete All Roles
router.delete('/', (req, res) => {
  Role.deleteMany((err) => {
    if (!err) {
      res.send('Successfully deleted all roles from database.');
      logger.info('Successfully deleted all roles from database');
    } else {
      res.send(err);
      logger.error(err);
    }
  });
});

// Get a specific role
router.get('/:requestNumber/:roleNumber', (req, res) => {
  Role.findOne({
    requestNumber: req.params.requestNumber,
    roleNumber: req.params.roleNumber,
  }, (err, foundRole) => {
    if (foundRole) {
      res.send(foundRole);
      logger.info(`Successfully retreived the role ${req.params.requestNumber}-${req.params.roleNumber}`);
    } else {
      res.send(`No roles matching the request-role number ${req.params.requestNumber}-${req.params.roleNumber} were found.`);
      logger.error(`No roles matching the request-role number ${req.params.requestNumber}-${req.params.roleNumber} were found.`);
      logger.error(err);
    }
  });
});

// Update a specific role
router.patch('/:requestNumber/:roleNumber', (req, res) => {
  Role.updateOne({
    requestNumber: req.params.requestNumber,
    roleNumber: req.params.roleNumber,
  }, {
    $set: req.body,
  },
  (err) => {
    if (!err) {
      res.send(`Successfully updated the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.info(`Successfully updated the role ${req.params.requestNumber}-${req.params.roleNumber}`);
    } else {
      res.send(`Forbidden: Unable to update the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.error(`Forbidden: Unable to update the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.error(err);
    }
  });
});

// Delete a specific role
router.delete('/:requestNumber/:roleNumber', (req, res) => {
  Role.deleteOne({
    requestNumber: req.params.requestNumber,
    roleNumber: req.params.roleNumber,
  }, (err) => {
    if (!err) {
      res.send(`Successfully deleted the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.info(`Successfully deleted the role ${req.params.requestNumber}-${req.params.roleNumber}`);
    } else {
      res.send(`Forbidden: Unable to delete the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.error(`Forbidden: Unable to delete the role ${req.params.requestNumber}-${req.params.roleNumber}`);
      logger.error(err);
    }
  });
});

module.exports = router;

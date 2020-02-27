const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

  requestNumber: {
    type: String,
    required: [true, 'A role must have a request number.'],
    index: true,
  },
  roleNumber: {
    type: String,
    required: [true, 'A role must have a role number.'],
    index: true,
  },
  projectName: String,
  client: String,
  roleName: String,
  grade: String,
  startDate: Date,
  endDate: Date,
  roleDescription: String,
  location: String,
  resourceManagerName: String,
  applied: {
    type: Boolean,
    required: true,
  },
});

roleSchema.index({
  requestNumber: 'text',
  roleNumber: 'text',
}, {
  unique: true,
  dropDups: true,
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

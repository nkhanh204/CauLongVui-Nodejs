const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    enum: ['Admin', 'Staff', 'Customer'],
    unique: true,
    trim: true,
  },
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

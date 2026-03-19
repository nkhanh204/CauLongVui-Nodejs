/**
 * Seed script: Tao cac Role mac dinh (Admin, Staff, Customer)
 * Chay: node src/seeds/role.seed.js
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Role = require('../models/role.model');

const roles = ['Admin', 'Staff', 'Customer'];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    for (const roleName of roles) {
      const exists = await Role.findOne({ roleName });
      if (!exists) {
        const role = await Role.create({ roleName });
        console.log('Created: ' + roleName + ' -> ' + role._id);
      } else {
        console.log('Exists:  ' + roleName + ' -> ' + exists._id);
      }
    }

    console.log('\n--- COPY roleId vao Postman ---');
    const allRoles = await Role.find();
    allRoles.forEach(r => console.log('  ' + r.roleName + ': ' + r._id));

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();

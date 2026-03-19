const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../exceptions/BadRequestError');
const roleService = require('./role.service');

/**
 * Create a new user
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
const create = async (userData) => {
  const existingUser = await User.findOne({ phoneNumber: userData.phoneNumber });
  if (existingUser) throw new BadRequestError('Phone number already exists');

  // Verify Role exists before assigning
  await roleService.findById(userData.roleId);

  const salt = await bcrypt.genSalt(10);
  userData.passwordHash = await bcrypt.hash(userData.password, salt);
  
  return await User.create(userData);
};

/**
 * Find all users with pagination
 * @param {Object} query 
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const items = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();
  return { items, pagination: { page, limit, total } };
};

/**
 * Find user by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new BadRequestError('User not found');
  return user;
};

/**
 * Update user
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  if (updateData.roleId) {
    // Verify Role exists
    await roleService.findById(updateData.roleId);
  }

  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.passwordHash = await bcrypt.hash(updateData.password, salt);
  }
  
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!user) throw new BadRequestError('User not found');
  return user;
};

/**
 * Delete user
 * @param {string} id 
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new BadRequestError('User not found');
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};

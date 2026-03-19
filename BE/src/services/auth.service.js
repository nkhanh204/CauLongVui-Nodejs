const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../exceptions/UnauthorizedError');
const { BadRequestError } = require('../exceptions/BadRequestError');
const roleService = require('./role.service');

/**
 * Handle user login
 * @param {string} phoneNumber 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
const login = async (phoneNumber, password) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) throw new UnauthorizedError('Invalid phone number or password');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new UnauthorizedError('Invalid phone number or password');

  // Payload for JWT Token
  const payload = {
    id: user._id.toString(),
    roleId: user.roleId.toString()
  };

  const JWT_SECRET = process.env.JWT_SECRET || 'CauLongVuiSecretKey2026';
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'CauLongVuiRefreshKey2026';

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

  const tokens = { accessToken, refreshToken };
  
  return { user, tokens };
};

/**
 * Handle user registration
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
const register = async (userData) => {
  const existingUser = await User.findOne({ phoneNumber: userData.phoneNumber });
  if (existingUser) throw new BadRequestError('Phone number already exists');

  // Verify Role exists before assigning
  await roleService.findById(userData.roleId);

  const salt = await bcrypt.genSalt(10);
  userData.passwordHash = await bcrypt.hash(userData.password, salt);
  
  return await User.create(userData);
};

/**
 * Handle user logout
 * @returns {Promise<void>}
 */
const logout = async () => {
  // Logic for token blacklisting if needed
};

module.exports = {
  login,
  register,
  logout,
};

const userService = require('../services/user.service');
const { sendResponse } = require('../utils/response');
const { userDto } = require('../dtos/user.dto');

const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  const data = userDto(user);
  return sendResponse(res, 201, true, 'User created successfully', data);
};

const getUsers = async (req, res) => {
  const data = await userService.findAll(req.query);
  const users = data.items.map(userDto);
  return sendResponse(res, 200, true, 'Get users success', { ...data, items: users });
};

const getUserById = async (req, res) => {
  const user = await userService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get user detail success', userDto(user));
};

const updateUser = async (req, res) => {
  const user = await userService.update(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Update user success', userDto(user));
};

const deleteUser = async (req, res) => {
  await userService.remove(req.params.id);
  return sendResponse(res, 200, true, 'Delete user success');
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

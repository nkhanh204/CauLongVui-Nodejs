const roleService = require('../services/role.service');
const { sendResponse } = require('../utils/response');
const { roleDto } = require('../dtos/role.dto');

/**
 * GET /roles
 */
const getRoles = async (req, res) => {
  const roles = await roleService.findAll();
  return sendResponse(res, 200, true, 'Get roles success', {
    items: roles.map(roleDto),
  });
};

/**
 * GET /roles/:id
 */
const getRoleById = async (req, res) => {
  const role = await roleService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get role success', roleDto(role));
};

/**
 * POST /roles
 */
const createRole = async (req, res) => {
  const role = await roleService.create(req.body);
  return sendResponse(res, 201, true, 'Create role success', roleDto(role));
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
};

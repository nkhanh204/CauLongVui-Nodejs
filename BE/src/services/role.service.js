const Role = require('../models/role.model');
const { BadRequestError } = require('../exceptions/BadRequestError');
const { NotFoundError } = require('../exceptions/NotFoundError');

/**
 * Lấy danh sách tất cả Role.
 * @returns {Promise<Array>}
 */
const findAll = async () => {
  return await Role.find().sort({ createdAt: 1 });
};

/**
 * Lấy Role theo ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new NotFoundError('Role not found');
  return role;
};

/**
 * Tạo Role mới.
 * @param {Object} data - { roleName }
 * @returns {Promise<Object>}
 */
const create = async (data) => {
  const existing = await Role.findOne({ roleName: data.roleName });
  if (existing) throw new BadRequestError('Role already exists');
  return await Role.create(data);
};

module.exports = {
  findAll,
  findById,
  create,
};

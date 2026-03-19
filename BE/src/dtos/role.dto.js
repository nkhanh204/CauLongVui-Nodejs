/**
 * Map Role model to DTO
 * @param {Object} role 
 * @returns {Object}
 */
const roleDto = (role) => {
  if (!role) return null;
  return {
    id: role._id,
    roleName: role.roleName,
    createdAt: role.createdAt,
  };
};

module.exports = {
  roleDto,
};

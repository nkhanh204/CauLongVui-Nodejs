const { z } = require('zod');

const createRoleSchema = z.object({
  body: z.object({
    roleName: z.enum(['Admin', 'Staff', 'Customer'], {
      errorMap: () => ({ message: 'roleName must be Admin, Staff, or Customer' }),
    }),
  }),
});

module.exports = {
  createRoleSchema,
};

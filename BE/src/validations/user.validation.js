const { z } = require('zod');

const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full Name is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters').max(15),
    email: z.string().email().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Role ID'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    phoneNumber: z.string().min(1),
    password: z.string().min(1),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(1).optional(),
    phoneNumber: z.string().min(10).max(15).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  }),
});

module.exports = {
  createUserSchema,
  loginSchema,
  updateUserSchema,
};

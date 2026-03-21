const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().min(0, 'Price must be non-negative'),
    stockQuantity: z.number().int().min(0, 'Stock must be non-negative').default(0),
    type: z.enum(['Food', 'Drink']),
    image: z.string().url('Invalid image URL').optional().nullable(),
    status: z.enum(['Active', 'Inactive']).optional(),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    stockQuantity: z.number().int().min(0).optional(),
    type: z.enum(['Food', 'Drink']).optional(),
    image: z.string().url().optional().nullable(),
    status: z.enum(['Active', 'Inactive']).optional(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};

const { z } = require('zod');

const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID').optional().nullable(),
    bookingId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Booking ID').optional().nullable(),
    courtId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Court ID').optional().nullable(),
    customerName: z.string().min(1, 'Customer Name is required'),
    items: z.array(z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })).min(1, 'At least one item is required'),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Completed', 'Cancelled']),
  }),
});

const returnEquipmentSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Product ID'),
      returnQuantity: z.number().int().min(1, 'Return quantity must be at least 1'),
    })).min(1, 'At least one item is required to return'),
  }),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  returnEquipmentSchema,
};

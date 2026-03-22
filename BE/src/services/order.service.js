const Order = require('../models/order.model');
const Product = require('../models/product.model');
const { NotFoundError } = require('../exceptions/NotFoundError');
const { BadRequestError } = require('../exceptions/BadRequestError');
const mongoose = require('mongoose');

/**
 * Find all food orders with pagination
 * @param {Object} options 
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10, bookingId, courtId, status }) => {
  const query = {};
  if (status) query.status = status;
  if (bookingId) query.bookingId = bookingId;
  if (courtId) query.courtId = courtId;
  
  const skip = (page - 1) * limit;
  const items = await Order.find(query).skip(skip).limit(limit)
    .populate('userId', 'fullName phoneNumber')
    .populate('items.productId', 'name image');
  const total = await Order.countDocuments(query);
  
  return { items, pagination: { page, limit, total } };
};

/**
 * Find order by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const order = await Order.findOne({ _id: id })
    .populate('userId', 'fullName phoneNumber')
    .populate('items.productId', 'name image');
  if (!order) throw new NotFoundError('Food Order not found');
  return order;
};

/**
 * Create new food order
 * @param {Object} orderData 
 * @returns {Promise<Object>}
 */
const create = async (orderData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;
    const validatedItems = [];

    // Validate products and calculate total
    for (const item of orderData.items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new BadRequestError(`Product not found: ${item.productId}`);
      }
      if (product.status !== 'Active') {
        throw new BadRequestError(`Product ${product.name} is currently inactive`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestError(`Not enough stock for ${product.name}. Available: ${product.stockQuantity}`);
      }

      // Decrement stock
      product.stockQuantity -= item.quantity;
      await product.save({ session });

      totalAmount += product.price * item.quantity;
      
      validatedItems.push({
        productId: product._id,
        quantity: item.quantity,
        unitPrice: product.price, // Dùng giá từ DB để bảo mật, không dùng giá từ client
        isRent: product.type === 'Equipment',
      });
    }

    const newOrder = await Order.create([{
      ...orderData,
      items: validatedItems,
      totalAmount,
    }], { session });

    await session.commitTransaction();
    session.endSession();
    
    return newOrder[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Update food order status
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const updateStatus = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) throw new NotFoundError('Food Order not found');
  
  // If cancelled, should we refund stock? Yes, that's best practice.
  if (status === 'Cancelled' && order.status !== 'Cancelled') {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      order.status = status;
      await order.save({ session });
      
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stockQuantity: item.quantity }
        }, { session });
      }
      await session.commitTransaction();
      session.endSession();
      return order;
    } catch(err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
  return updatedOrder;
};

/**
 * Return equipment for a food order
 * @param {string} orderId 
 * @param {Array} itemsToReturn 
 * @returns {Promise<Object>}
 */
const returnEquipment = async (orderId, itemsToReturn) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);
    if (!order) {
      throw new NotFoundError('Food Order not found');
    }
    if (order.status === 'Cancelled') {
      throw new BadRequestError('Cannot return equipment for a cancelled order');
    }

    for (const returnItem of itemsToReturn) {
      // Find item in order
      const orderItem = order.items.find(i => i.productId.toString() === returnItem.productId);
      if (!orderItem) {
        throw new BadRequestError(`Item with Product ID ${returnItem.productId} not found in this order`);
      }
      if (!orderItem.isRent) {
        throw new BadRequestError(`Item ${returnItem.productId} is not a rented equipment`);
      }
      if (orderItem.returnedQuantity + returnItem.returnQuantity > orderItem.quantity) {
        throw new BadRequestError(`Cannot return ${returnItem.returnQuantity} items. Already returned ${orderItem.returnedQuantity} out of ${orderItem.quantity}`);
      }

      // Update returned quantity
      orderItem.returnedQuantity += returnItem.returnQuantity;

      // Increment stock
      await Product.findByIdAndUpdate(returnItem.productId, {
        $inc: { stockQuantity: returnItem.returnQuantity }
      }, { session });
    }

    await order.save({ session });
    
    await session.commitTransaction();
    session.endSession();

    // Return populated order
    return await findById(orderId);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  returnEquipment,
};

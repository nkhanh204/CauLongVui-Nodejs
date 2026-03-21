const Product = require('../models/product.model');
const { NotFoundError } = require('../exceptions/NotFoundError');

/**
 * Find all products with pagination
 * @param {Object} options - Filtering and pagination options
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10, type, status = 'Active', search }) => {
  const query = {};
  if (status) query.status = status;
  if (type) query.type = type;
  if (search) query.name = { $regex: search, $options: 'i' };
  
  const skip = (page - 1) * limit;
  const items = await Product.find(query).skip(skip).limit(limit);
  const total = await Product.countDocuments(query);
  
  return { items, pagination: { page, limit, total } };
};

/**
 * Find product by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const product = await Product.findOne({ _id: id });
  if (!product) throw new NotFoundError('Product not found');
  return product;
};

/**
 * Create new product
 * @param {Object} productData 
 * @returns {Promise<Object>}
 */
const create = async (productData) => {
  return await Product.create(productData);
};

/**
 * Update product
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
  if (!product) throw new NotFoundError('Product not found');
  return product;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};

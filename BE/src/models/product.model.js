const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ['Food', 'Drink'],
  },
  image: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
}, { timestamps: true });

// Lọc sản phẩm theo loại + trạng thái (menu hiển thị)
productSchema.index({ status: 1, type: 1 });
// Tìm kiếm theo tên (text search)
productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

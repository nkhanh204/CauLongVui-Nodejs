const foodOrderService = require('../services/food-order.service');
const { sendResponse } = require('../utils/response');
const { foodOrderDto } = require('../dtos/food-order.dto');

const getFoodOrders = async (req, res) => {
  const data = await foodOrderService.findAll(req.query);
  // Need to map after population. If population changes the nested objects, DTO should handle it.
  const items = data.items.map(foodOrderDto);
  return sendResponse(res, 200, true, 'Get food orders success', { ...data, items });
};

const getFoodOrderById = async (req, res) => {
  const order = await foodOrderService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get food order detail success', foodOrderDto(order));
};

const createFoodOrder = async (req, res) => {
  const orderData = req.body;
  
  // Lấy userId nếu người dùng đã đăng nhập (middleware set trong req.user)
  if (req.user && req.user.id) {
    orderData.userId = req.user.id;
  }
  
  const order = await foodOrderService.create(orderData);
  return sendResponse(res, 201, true, 'Create food order success', foodOrderDto(order));
};

const updateFoodOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await foodOrderService.updateStatus(req.params.id, status);
  return sendResponse(res, 200, true, 'Update food order status success', foodOrderDto(order));
};

module.exports = {
  getFoodOrders,
  getFoodOrderById,
  createFoodOrder,
  updateFoodOrderStatus,
};

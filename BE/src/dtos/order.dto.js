const orderDto = (order) => {
  return {
    id: order._id,
    userId: order.userId,
    bookingId: order.bookingId,
    courtId: order.courtId,
    customerName: order.customerName,
    items: order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      isRent: item.isRent,
      returnedQuantity: item.returnedQuantity,
    })),
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

module.exports = {
  orderDto,
};

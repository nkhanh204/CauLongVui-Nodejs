const productDto = (product) => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    stockQuantity: product.stockQuantity,
    type: product.type,
    image: product.image,
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

module.exports = {
  productDto,
};

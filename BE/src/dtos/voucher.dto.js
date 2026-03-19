/**
 * Map Voucher model to DTO
 * @param {Object} voucher 
 * @returns {Object}
 */
const voucherDto = (voucher) => {
  if (!voucher) return null;
  return {
    id: voucher._id,
    voucherCode: voucher.voucherCode,
    description: voucher.description,
    discountType: voucher.discountType,
    discountValue: voucher.discountValue,
    minOrderValue: voucher.minOrderValue,
    maxDiscount: voucher.maxDiscount,
    startDate: voucher.startDate,
    endDate: voucher.endDate,
    usageLimit: voucher.usageLimit,
    usedCount: voucher.usedCount,
    isActive: voucher.isActive,
    targetUserId: voucher.targetUserId,
  };
};

module.exports = {
  voucherDto,
};

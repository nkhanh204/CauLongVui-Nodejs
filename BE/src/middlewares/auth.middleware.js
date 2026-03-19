const env = require('../config/env');
const { UnauthorizedError } = require('../exceptions/UnauthorizedError');

/**
 * Middleware validateApiKey: Bảo vệ Endpoint thông qua cơ chế Public/Secret Key
 * @param {'public' | 'secret'} requiredType - Cấp độ bảo mật bắt buộc (mặc định 'public')
 */
const validateApiKey = (requiredType = 'public') => {
  return (req, res, next) => {
    try {
      const publicKey = req.headers['x-api-public-key'];
      const secretKey = req.headers['x-api-secret-key'];

      // 1. Kiểm tra Secret Key trước (Dành cho Admin / Webhook Server-to-Server)
      if (secretKey && secretKey === env.API_SECRET_KEY) {
        req.authType = 'admin';
        return next();
      }

      // Nếu yêu cầu bắt buộc là 'secret' mà không khớp, block ngay tại đây
      if (requiredType === 'secret') {
        throw new UnauthorizedError('Secret Key is required for this action');
      }

      // 2. Kiểm tra Public Key (Dành cho Client / Mobile App)
      if (publicKey && publicKey === env.API_PUBLIC_KEY) {
        req.authType = 'client';
        return next();
      }

      // Không có Key nào hợp lệ
      throw new UnauthorizedError('Invalid API Key');
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { validateApiKey };

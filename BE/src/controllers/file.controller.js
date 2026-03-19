const { sendResponse } = require('../utils/response');

/**
 * Handle multiple images upload
 * @param {Object} req 
 * @param {Object} res 
 */
const uploadImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return sendResponse(res, 400, false, 'No files uploaded');
  }

  const filePaths = req.files.map(file => `/uploads/images/${file.filename}`);
  return sendResponse(res, 201, true, 'Images uploaded successfully', filePaths);
};

/**
 * Handle single avatar upload
 * @param {Object} req 
 * @param {Object} res 
 */
const uploadAvatar = async (req, res) => {
  if (!req.file) {
    return sendResponse(res, 400, false, 'No file uploaded');
  }

  const filePath = `/uploads/avatars/${req.file.filename}`;
  return sendResponse(res, 201, true, 'Avatar uploaded successfully', filePath);
};

module.exports = {
  uploadImages,
  uploadAvatar,
};

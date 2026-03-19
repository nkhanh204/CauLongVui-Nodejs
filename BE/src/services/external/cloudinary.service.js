/**
 * Cloudinary Service for image management
 * Location: src/services/external/cloudinary.service.js
 */

/**
 * Upload image to Cloudinary
 * @param {string} file - Base64 or file path
 * @returns {Promise<Object>} - Upload result
 */
const uploadImage = async (file) => {
  // Placeholder for real Cloudinary implementation
  // return await cloudinary.v2.uploader.upload(file);
  return { url: 'https://placeholder.com/image.jpg', publicId: 'abc' };
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId 
 * @returns {Promise<void>}
 */
const deleteImage = async (publicId) => {
  // await cloudinary.v2.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteImage,
};

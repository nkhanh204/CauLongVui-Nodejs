const courtService = require('../services/court.service');
const { sendResponse } = require('../utils/response');
const { courtDto } = require('../dtos/court.dto');

const getCourts = async (req, res) => {
  const data = await courtService.findAll(req.query);
  const items = data.items.map(courtDto);
  return sendResponse(res, 200, true, 'Get courts success', { ...data, items });
};

const getCourtById = async (req, res) => {
  const user = await courtService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get court detail success', courtDto(user));
};

const createCourt = async (req, res) => {
  console.log('Create Court Body:', req.body);
  console.log('Create Court Files:', req.files);
  
  const fileImages = req.files ? req.files.map(f => `/uploads/images/${f.filename}`) : [];
  let bodyImages = [];
  if (req.body.images) {
    bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
  }
  
  const courtData = {
    ...req.body,
    images: [...bodyImages, ...fileImages]
  };
  
  console.log('Court data to save:', courtData);
  
  const court = await courtService.create(courtData);
  return sendResponse(res, 201, true, 'Create court success', courtDto(court));
};

const fs = require('fs').promises;
const path = require('path');

const updateCourt = async (req, res) => {
  const fileImages = req.files ? req.files.map(f => `/uploads/images/${f.filename}`) : [];
  let bodyImages = [];
  if (req.body.images) {
    bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
  }

  // If new images are uploaded or provided, handle old image deletion
  if (fileImages.length > 0) {
    const oldCourt = await courtService.findById(req.params.id);
    if (oldCourt && oldCourt.images && oldCourt.images.length > 0) {
      // Delete old files from disk
      for (const oldPath of oldCourt.images) {
        try {
          const absolutePath = path.join(__dirname, '../..', oldPath);
          await fs.unlink(absolutePath);
        } catch (err) {
          console.error(`Failed to delete old image ${oldPath}:`, err.message);
        }
      }
    }
  }

  const updateData = {
    ...req.body,
    ...( (fileImages.length > 0 || bodyImages.length > 0) ? { images: [...bodyImages, ...fileImages] } : {} )
  };

  const court = await courtService.update(req.params.id, updateData);
  return sendResponse(res, 200, true, 'Update court success', courtDto(court));
};

const deleteCourt = async (req, res) => {
  await courtService.delete(req.params.id);
  return sendResponse(res, 200, true, 'Delete court success');
};

module.exports = {
  getCourts,
  getCourtById,
  createCourt,
  updateCourt,
  deleteCourt,
};

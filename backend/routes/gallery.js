import express from 'express';
import {
  getGalleryPhotos,
  getFeaturedPhotos,
  getGalleryPhotoById,
  createGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto
} from '../controllers/galleryController.js';
import { authenticate, isAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/featured', optionalAuth, getFeaturedPhotos);
router.get('/', optionalAuth, getGalleryPhotos);
router.get('/:id', optionalAuth, getGalleryPhotoById);

// Admin only routes
router.post('/', authenticate, isAdmin, createGalleryPhoto);
router.put('/:id', authenticate, isAdmin, updateGalleryPhoto);
router.delete('/:id', authenticate, isAdmin, deleteGalleryPhoto);

export default router;


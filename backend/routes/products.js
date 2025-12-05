import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { authenticate, isAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const productValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  body('category').isIn(['wedding', 'formal', 'accessories']).withMessage('Valid category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Valid stock quantity is required')
];

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/:id', optionalAuth, getProductById);

// Admin only routes
router.post('/', authenticate, isAdmin, productValidation, createProduct);
router.put('/:id', authenticate, isAdmin, productValidation, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;



import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';
import { authenticate, isAdmin, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation
const orderValidation = [
  body('shippingAddress.street').trim().notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
  body('shippingAddress.postalCode').trim().notEmpty().withMessage('Postal code is required')
];

// Create order (guest or authenticated)
router.post('/', optionalAuth, orderValidation, createOrder);

// Get orders (requires authentication)
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);

// Update order status (admin only)
router.put('/:id/status', authenticate, isAdmin, 
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  updateOrderStatus
);

export default router;



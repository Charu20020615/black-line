import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getSessionId = (req) => {
  return req.headers['x-session-id'] || req.cookies?.sessionId || null;
};

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, guestInfo } = req.body;

    // Get cart
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    } else {
      const sessionId = getSessionId(req);
      cart = await Cart.findOne({ sessionId }).populate('items.product');
    }

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock and calculate total
    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({ message: 'Invalid product in cart' });
      }

      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.product.name}` 
        });
      }

      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        size: item.size,
        color: item.color
      });

      // Update stock
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Create order
    const orderData = {
      items: orderItems,
      total,
      shippingAddress,
      paymentMethod: paymentMethod || 'cash'
    };

    if (req.user) {
      orderData.user = req.user._id;
    } else {
      orderData.guestInfo = guestInfo;
    }

    const order = await Order.create(orderData);
    await order.populate('items.product');

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    let orders;
    
    if (req.user) {
      if (req.user.role === 'admin') {
        // Admin can see all orders
        orders = await Order.find().populate('user', 'name email').populate('items.product').sort({ createdAt: -1 });
      } else {
        // User can see only their orders
        orders = await Order.find({ user: req.user._id }).populate('items.product').sort({ createdAt: -1 });
      }
    } else {
      return res.status(401).json({ message: 'Authentication required' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has access
    if (req.user.role !== 'admin' && order.user && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    await order.populate('items.product');

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



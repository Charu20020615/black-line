import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Generate or get session ID
const getSessionId = (req) => {
  return req.headers['x-session-id'] || req.cookies?.sessionId || null;
};

export const getCart = async (req, res) => {
  try {
    let cart;
    
    if (req.user) {
      // Authenticated user
      cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    } else {
      // Guest user
      const sessionId = getSessionId(req);
      if (sessionId) {
        cart = await Cart.findOne({ sessionId }).populate('items.product');
      }
    }

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    // Calculate total
    let total = 0;
    cart.items.forEach(item => {
      if (item.product) {
        total += item.product.price * item.quantity;
      }
    });

    res.json({
      items: cart.items,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    const product = await Product.findById(productId);
    if (!product || product.status !== 'active') {
      return res.status(404).json({ message: 'Product not found or unavailable' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart;
    
    if (req.user) {
      // Authenticated user
      cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
      }
    } else {
      // Guest user
      const sessionId = getSessionId(req) || `session_${Date.now()}_${Math.random()}`;
      cart = await Cart.findOne({ sessionId });
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }
      // Send session ID in response
      res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId && 
      item.size === size && 
      item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    let cart;
    
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = getSessionId(req);
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items.pull(itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart;
    
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = getSessionId(req);
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull(itemId);
    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    let cart;
    
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = getSessionId(req);
      cart = await Cart.findOne({ sessionId });
    }

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



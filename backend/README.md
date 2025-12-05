# Black Line Exclusive - Backend API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Start the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login (user or admin)
- `GET /api/auth/profile` - Get user profile (requires auth)

### Products
- `GET /api/products` - Get all products (optional: ?category=wedding|formal|accessories)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get cart (guest or authenticated)
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order (guest or authenticated)
- `GET /api/orders` - Get orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Creating Admin User

To create an admin user, you can either:

1. **Manually in MongoDB:**
   - Connect to your MongoDB database
   - Find or create a user document
   - Set `role: "admin"`

2. **Using MongoDB Compass or similar tool:**
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Notes

- Guest users can add items to cart using session-based cart (stored with sessionId)
- Authenticated users have persistent carts linked to their user ID
- All product management operations require admin role
- JWT tokens are valid for 7 days



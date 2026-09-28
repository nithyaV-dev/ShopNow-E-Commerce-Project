# API quick reference

Auth:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Products:
- GET /api/products
- GET /api/products/categories
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

Cart:
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:itemId
- DELETE /api/cart/:itemId
- DELETE /api/cart

Orders:
- POST /api/orders
- GET /api/orders/mine
- GET /api/orders/:id
- GET /api/orders/admin/all
- PUT /api/orders/:id/status

Users:
- GET /api/users (admin)

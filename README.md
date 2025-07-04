# Checkout System Backend

## Overview

This project implements a checkout/cart backend system with the following features:

- Product listing (A, B, C, D) with prices
- Add items to cart
- Remove items from cart
- View cart details with discounts and total price calculation
- Clear cart
- Discount rules:
  - Buy 3 of Item A for Rs 85
  - Buy 2 of Item B for Rs 35
  - Additional Rs 20 discount if total after discounts exceeds Rs 150

Built with Node.js, TypeScript, Express, MongoDB (Mongoose), following MVC pattern and SOLID principles.

---

## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Database Architecture](#database-architecture)
- [Seed Data](#seed-data)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Future Improvements](#future-improvements)

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/iamshivanshyadav/Betalectic-Assesment/new/main/checkout-system
cd checkout-system-backend
````

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

Create a `.env` file in root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/checkoutdb
```

4. Seed the products collection:

```bash
npx ts-node seed.ts
```

5. Start development server:

```bash
npm run dev
```

The backend server will be running on `http://localhost:5000`.

---

## Environment Variables

| Variable   | Description            | Example                              |
| ---------- | ---------------------- | ------------------------------------ |
| PORT       | Server listening port  | 5000                                 |
| MONGO\_URI | MongoDB connection URI | mongodb://localhost:27017/checkoutdb |

---

## Database Architecture

### Collections

* **products**

  * Fields:

    * `_id`: ObjectId
    * `name`: string (unique, e.g., "A", "B")
    * `price`: number (e.g., 30)
* **carts**

  * Fields:

    * `_id`: ObjectId
    * `items`: array of objects containing:

      * `product`: ObjectId (reference to product)
      * `quantity`: number

### Relations

* `carts.items.product` references `products._id`.
* Cart contains product quantities and prices are derived from `products`.
* Discounts applied dynamically during calculation.

---

## Seed Data

Use `seed.ts` script to insert initial products into MongoDB:

* A - Rs 30
* B - Rs 20
* C - Rs 50
* D - Rs 15

---

## API Endpoints

### 1. List Products

* `GET /api/products`
* Response: List of products with price

### 2. Add Item to Cart

* `POST /api/cart/add`
* Body: `{ "productName": "A" }`
* Adds one quantity of the product

### 3. Delete Item from Cart

* `POST /api/cart/delete`
* Body: `{ "productName": "A" }`
* Removes one quantity of the product; removes item if quantity hits zero

### 4. Get Cart

* `GET /api/cart`
* Response: Cart items with quantity, price (with discounts), total, and total discounts

### 5. Clear Cart

* `POST /api/cart/clear`
* Empties the cart

---

## Testing with Postman

Import the provided Postman collection and set `{{baseUrl}}` to your server URL.

Test all endpoints:

* List products
* Add items to cart
* Remove items from cart
* View cart summary
* Clear cart

---

## Future Improvements

* Add authentication and user-specific carts
* Implement more complex discount rules dynamically loaded from DB
* Add automated unit and integration tests
* Add Swagger or OpenAPI documentation

---


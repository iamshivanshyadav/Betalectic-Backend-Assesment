import express, { RequestHandler } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { calculateCart } from '../services/cartService';

const router = express.Router();


router.post('/add', (async (req, res) => {
  const { productName } = req.body;

  const product = await Product.findOne({ name: productName });
  if (!product) return res.status(404).json({ error: 'Product not found' });

  let cart = await Cart.findOne();
  if (!cart) cart = new Cart({ items: [] });

  const existingItem = cart.items.find((item: any) =>
    item.product.toString() === product._id.toString()
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: product._id, quantity: 1 });
  }

  await cart.save();
  res.json({ message: `${productName} added to cart` });
}) as RequestHandler);


router.post('/delete',( async (req, res) => {
  const { productName } = req.body;

  const product = await Product.findOne({ name: productName });
  if (!product) return res.status(404).json({ error: 'Product not found' });

  let cart = await Cart.findOne();
  if (!cart) return res.status(404).json({ error: 'Cart is empty' });

  const itemIndex = cart.items.findIndex((item: any) =>
    item.product.toString() === product._id.toString()
  );

  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found in cart' });

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
  } else {
    cart.items.splice(itemIndex, 1); 
  }

  await cart.save();
  res.json({ message: `${productName} removed from cart` });
})as RequestHandler);

router.post('/clear', async (req, res) => {
  await Cart.deleteMany({});
  res.json({ message: 'Cart cleared' });
});


router.get('/', async (req, res) => {
  const result = await calculateCart();
  res.json(result);
});

export default router;

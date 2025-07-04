import Product from '../models/Product';
import Cart from '../models/Cart';

export const calculateCart = async () => {
  const cart = await Cart.findOne({}).populate('items.product');
  if (!cart) return { items: [], total: 0, discount: 0 };

  let total = 0;
  let totalDiscount = 0;

  const detailedItems = cart.items.map((item) => {
    const { product, quantity } = item as any;
    let price = product.price * quantity;
    let discount = 0;

    if (product.name === 'A' && quantity >= 3) {
      const sets = Math.floor(quantity / 3);
      const remainder = quantity % 3;
      price = sets * 85 + remainder * 30;
      discount = (quantity * 30) - price;
    }

    if (product.name === 'B' && quantity >= 2) {
      const sets = Math.floor(quantity / 2);
      const remainder = quantity % 2;
      price = sets * 35 + remainder * 20;
      discount = (quantity * 20) - price;
    }

    total += price;
    totalDiscount += discount;

    return {
      product: product.name,
      quantity,
      price,
      discount
    };
  });

  // Additional basket discount
  if (total > 150) {
    total -= 20;
    totalDiscount += 20;
  }

  return {
    items: detailedItems,
    subtotal:total,
    totalDiscount,
    total: total-totalDiscount
  };
};

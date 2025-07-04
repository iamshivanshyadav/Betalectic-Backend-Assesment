import mongoose from 'mongoose';
import Product from './models/Product';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI!).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany([
    { name: 'A', price: 30 },
    { name: 'B', price: 20 },
    { name: 'C', price: 50 },
    { name: 'D', price: 15 }
  ]);
  console.log('Seeded successfully!');
  process.exit(0);
});

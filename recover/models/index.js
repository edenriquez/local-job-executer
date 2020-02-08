import mongoose from 'mongoose';
import Product from './products';
import ProducHistory from './productHistory';
import Vendor from './vendors';
import Bot from './bot';
import Category from './categories';
import Search from './search';

const connectDb = () => {
  return mongoose.connect(
    process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
};

const models = {
  Product,
  ProducHistory,
  Vendor,
  Bot,
  Category,
  Search
};

export {
  connectDb
};

export default models;

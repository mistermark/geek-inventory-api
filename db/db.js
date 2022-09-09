import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import TypeSchema from '../models/CollectionType.js';
import ItemSchema from '../models/CollectionItem.js';
import UserSchema from '../models/User.js';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
  console.error("Error while connecting to DB");
});

const Type = mongoose.model('Type', TypeSchema, 'types');
const Item = mongoose.model('Item', ItemSchema, 'items');
const User = mongoose.model('User', UserSchema, 'users');

export {
  Type,
  Item,
  User
}
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import TypeSchema from '../models/CollectionType.js';
import CollectionItemSchema from '../models/CollectionItem.js';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
  console.error("Error while connecting to DB");
});

const Type = mongoose.model('Type', TypeSchema, 'types');
const CollectionItem = mongoose.model('CollectionItem', CollectionItemSchema, 'items');

export {
  Type,
  CollectionItem
}
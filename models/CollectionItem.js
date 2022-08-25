import mongoose from 'mongoose';

import { PriceSchema, RefUrlSchema } from './SharedSchema.js';

const Schema = mongoose.Schema;

const CollectionItemSchema = new Schema({
  type: String,
  name: String,
  state: {
    type: String,
    enum: ['pre-order', 'sealed', 'built', 'opened', 'boxed', 'sold'],
  },
  quantity: Number,
  release_date: String,
  price: PriceSchema,
  ean: String,
  link: RefUrlSchema,
  meta: {
    type: Schema.Types.Mixed,
    default: {}
  }
});

export default CollectionItemSchema;

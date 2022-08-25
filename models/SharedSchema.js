import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RefUrlSchema = new Schema({
  url: String,
  name: String,
});

const PriceSchema = new Schema({
  amount: Number,
  currency: String,
});

export { 
    PriceSchema,
    RefUrlSchema
}
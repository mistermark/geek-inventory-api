import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  type: String,
  name: String,
});

export default TypeSchema;


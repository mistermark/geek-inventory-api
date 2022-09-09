import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  items: [{ type: Schema.ObjectId, ref: 'Item'}],
  types: [{ type: Schema.ObjectId, red: 'Type'}]
});

export default UserSchema;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  }
})

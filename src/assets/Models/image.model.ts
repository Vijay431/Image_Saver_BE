import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
  token: {
    type: String
  },
  caption: {
    type: String
  },
  id: {
    type: String
  },
  image: {
    imgdata: Buffer,
    contentType: String
  }
})

import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  UserName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashPassword:{
    type: String,
    required:true
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

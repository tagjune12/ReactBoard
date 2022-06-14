import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: Number,
  userId: String,
  password: String
})
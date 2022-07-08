import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  postId: { type: mongoose.Types.ObjectId, required: true },
  author: {
    type: {
      _id: { type: mongoose.Types.ObjectId, required: true },
      userId: { type: String, required: true },
      nickname: { type: String, required: true }
    }, required: true
  },
  content: { type: String, required: true },
  reply: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
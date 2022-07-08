import mongoose, { Schema } from 'mongoose';

const ReplySchema = new Schema({
  commentId: { type: mongoose.Types.ObjectId, required: true },
  author: {
    type: {
      _id: { type: mongoose.Types.ObjectId, required: true },
      userId: { type: String, required: true },
      nickname: { type: String, required: true }
    }, required: true
  },
  content: { type: String, required: true },
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

const Reply = mongoose.model('Reply', ReplySchema);

export default Reply;
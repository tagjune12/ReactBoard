import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, unique: true }
});


// 인스턴스 메서드
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
}

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
}

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;

  return data;
}

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      userId: this.userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );

  return token;
}



// 스태틱 메서드
UserSchema.statics.findByNickname = async function (nickname) {
  return this.findOne({ nickname });
}

UserSchema.statics.findByUserId = async function (userId) {
  return this.findOne({ userId });
}


const User = mongoose.model('User', UserSchema);
export default User;
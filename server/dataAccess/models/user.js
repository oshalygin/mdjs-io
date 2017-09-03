import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  referrer: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  role: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

export default User;

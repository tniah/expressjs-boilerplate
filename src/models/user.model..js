import mongoose from 'mongoose';
import {toJSON} from './plugins';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

userSchema.plugin(toJSON);

export const UserModel = mongoose.model('User', userSchema);

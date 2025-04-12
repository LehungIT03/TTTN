import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
        type: String,
        required: true,
        default: 'Anonymous',
      },
    lastname: {
        type: String,
        required: true,
        default: 'Anonymous',
      },
    identify: {
      type: String,
      required: true,
      
    },
    email: {
        type: String,
        required: true,
      },
    phonenumber: {
      type: String,
      required: true,
      
    },
    quyen:{
        tenquyen:{
            type: String,
            default: 'Người dùng',
        }
    }

  },
  { timestamps: true }
);

export const UserModel = mongoose.model('Users', schema);

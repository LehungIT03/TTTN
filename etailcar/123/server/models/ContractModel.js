import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', // Tham chiếu đến bảng Users
      required: true,
    },
    totalprice: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      required: true,
      default:"Chờ duyệt đặt cọc" 
    },
    address: {
      type: String,
      required: true,
      default: "null",
    },
    phone: {
      type: String,
      required: true,
      default: "null",
    },
    name: {
      type: String,
      required: true,
      default: "null",
    },
    carReturnDate: {
      type: String,
      required: true,
      default: "null",
    },
    getCarDate: {
      type: String,
      required: true,
      default: "null",
    },
    dayrent: {
      type: String,
      required: true,
      default: "null",
    }
  },
  { timestamps: true }
);

export const ContractModel = mongoose.model('Contracts', schema);

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    carid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cars", // Đảm bảo tên 'Cars' khớp với tên mô hình CarModel
      required: true,
    },
    contractid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contracts", // Tham chiếu đến bảng Contracts
      required: true,
    },
    dayrent: {
      type: Number,
      required: true,
      default: 0,
    },
    deposits: {
      type: Number,
      required: true,
      default: 0,
    },
    method: {
      type: String,
      required: true,
      default: "online",
    },
    
  },
  { timestamps: true }
);

export const DetailsContractModel = mongoose.model("DetailsContracts", schema);

import { CarModel } from "../models/CarModel.js";
import { ContractModel } from "../models/ContractModel.js";
import { DetailsContractModel } from "../models/DetailsContractModel.js";

export const getCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCar = async (req, res) => {
  try {
    const { _id } = req.body; // Lấy ID của xe từ request body

    // Tìm thông tin xe dựa trên _id
    const car = await CarModel.findOne({ _id });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Tìm tất cả hợp đồng liên quan đến chiếc xe này từ DetailsContractModel
    const carContracts = await DetailsContractModel.find({
      carid: _id, // Kiểm tra tất cả hợp đồng liên quan đến xe này
    });

    let isRented = false;
    // Duyệt qua tất cả các hợp đồng và kiểm tra xem có hợp đồng nào có status là 'Lấy xe' không
    for (const detailContract of carContracts) {
      const contract = await ContractModel.findOne({
        _id: detailContract.contractid,
        status: "Đã đặt cọc", // Kiểm tra hợp đồng có trạng thái 'Lấy xe'
      });
      console.log(contract);
      if (contract) {
        isRented = true;
        break; // Nếu tìm thấy một hợp đồng đang lấy xe, không cần kiểm tra tiếp
      }
    }

    // Trả về thông tin xe và trạng thái của việc thuê xe
    res.status(200).json({
      car,
      isRented,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createCar = async (req, res) => {
  try {
    const newcar = req.body;
    const car = new CarModel(newcar);

    await car.save();

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updateCar = req.body;
    const car = await CarModel.findOneAndUpdate(
      { _id: updateCar._id },
      updateCar.carData,
      { new: true }
    );
    console.log("[car]", car);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const removeCar = async (req, res) => {
  try {
    const updateCar = req.body;

    const car = await CarModel.findByIdAndDelete({ _id: updateCar._id });
    console.log("[car]", car);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

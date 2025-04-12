import { CarModel } from '../models/CarModel.js';
import { ContractModel } from '../models/ContractModel.js';
import { DetailsContractModel } from '../models/DetailsContractModel.js';

export const getDetailsContracts = async (req, res) => {
  try {
    const detailscontracts = await DetailsContractModel.find();
    res.status(200).json(detailscontracts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const getDetailsContractsByUser = async (req, res) => {
  try {
    // Lấy tất cả hợp đồng của người dùng dựa trên userId
    const contracts = await ContractModel.find({ userid: req.body.userId }).sort({ createdAt: -1 });

    // Lấy tất cả contractid từ danh sách hợp đồng
    const contractIds = contracts.map(contract => contract._id);

    // Lấy chi tiết hợp đồng dựa trên contractid
    const detailsContracts = await DetailsContractModel.find({ contractid: { $in: contractIds } }).sort({ createdAt: -1 });;
    const carIds = detailsContracts.map(item => item.carid)
    const cardDetail = await CarModel.find({ _id: { $in: carIds } });

    // Trả về cả contracts và detailsContracts
    res.status(200).json({
      contracts,
      detailsContracts,
      cardDetail
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getDetailsContractsAdmin = async (req, res) => {
  try {
    // Lấy tất cả hợp đồng của người dùng dựa trên userId
    const contracts = await ContractModel.find();

    // Lấy tất cả contractid từ danh sách hợp đồng
    const contractIds = contracts.map(contract => contract._id);

    // Lấy chi tiết hợp đồng dựa trên contractid
    const detailsContracts = await DetailsContractModel.find({ contractid: { $in: contractIds } });
    const carIds = detailsContracts.map(item => item.carid)
    const cardDetail = await CarModel.find({ _id: { $in: carIds } });

    // Trả về cả contracts và detailsContracts
    res.status(200).json({
      contracts,
      detailsContracts,
      cardDetail
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createDetailsContract = async (req, res) => {
  try {
    const newdetailscontract = req.body;

    const detailscontract = new DetailsContractModel(newdetailscontract);
    await detailscontract.save();

    res.status(200).json(detailscontract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateDetailsContract = async (req, res) => {
  try {
    const updateDetailsContract = req.body;
    console.log(res.body)
    const detailscontract = await DetailsContractModel.findOneAndUpdate(
      { _id: updateDetailsContract._id },
      updateDetailsContract,
      { new: true }
    );
    console.log('[detailscontract]',detailscontract);
    res.status(200).json(detailscontract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};



export const removeDetailsContract = async (req, res) => {
  try {
    const updateDetailsContract = req.body;

    const detailscontract = await DetailsContractModel.findByIdAndDelete(
      { _id: updateDetailsContract._id }
      
    );
    console.log('[detailscontract]',detailscontract);
    res.status(200).json(detailscontract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const getMostRentedCars = async (req, res) => {
  try {
    const cars = await DetailsContractModel.aggregate([
      {
        $group: {
          _id: "$carid", // Nhóm theo carid
          rentCount: { $sum: 1 }, // Đếm số lần thuê xe
        },
      },
      {
        $lookup: {
          from: "cars", // Tham chiếu đến bảng Cars
          localField: "_id",
          foreignField: "_id",
          as: "carDetails", // Thông tin chi tiết của xe
        },
      },
      {
        $unwind: "$carDetails", // Bóc tách thông tin chi tiết của xe
      },
      {
        $sort: { rentCount: -1 }, // Sắp xếp theo số lần thuê (giảm dần)
      },
      {
        $limit: 10, // Giới hạn kết quả (ví dụ: 10 xe được thuê nhiều nhất)
      },
      {
        $project: {
          _id: 0, // Không hiển thị ID
          carid: "$_id", // Hiển thị carid
          carname: "$carDetails.carname", // Hiển thị tên xe
          rentCount: 1, // Hiển thị số lần thuê xe
          pricerent: "$carDetails.pricerent", // Hiển thị giá thuê
        },
      },
    ]);

    res.status(200).json(cars); // Trả về danh sách xe được thuê nhiều nhất
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
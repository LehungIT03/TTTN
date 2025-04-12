import { CarModel } from '../models/CarModel.js';
import { ContractModel } from '../models/ContractModel.js';
import { DetailsContractModel } from '../models/DetailsContractModel.js';

export const getContracts = async (req, res) => {
  try {
    const contracts = await ContractModel.find().sort({ createdAt: -1 });
    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createContract = async (req, res) => {
  try {
    const newcontract = req.body;

    const contract = new ContractModel(newcontract);
    await contract.save();

    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateContract = async (req, res) => {
  try {
    const updateContract = req.body;

    const contract = await ContractModel.findOneAndUpdate(
      { _id: updateContract._id },
      updateContract,
      { new: true }
    );
    
    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const removeContract = async (req, res) => {
  try {
    const updateContract = req.body;

    const contract = await ContractModel.findByIdAndDelete(
      { _id: updateContract._id }
    );
    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getRevenueByStatusPaid = async (req, res) => {
  // Lấy tất cả các hợp đồng có trạng thái là "Paid"
  const { startDate, endDate } = req.query;
  let query = { status: 'Đã trả xe và thanh toán' };

  // Lọc theo ngày nếu có
  if (startDate && endDate) {
    query = {
      ...query,
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }

  try {
    // Lấy hợp đồng với thông tin người thuê
    const contracts = await ContractModel.find(query)
      .populate('userid', 'username email firstname lastname').sort({ createdAt: -1 }); // Lấy tên và email của người thuê
    
    let totalRevenue = 0;
    const data = [];
    for (const contract of contracts) {
      // Lấy thông tin chi tiết của hợp đồng
      const details = await DetailsContractModel.find({
        contractid: contract._id,
      })

      const carItem = await CarModel.findById({_id: details[0]?.carid})
      const contractRevenue = parseFloat(contract.totalprice);
      totalRevenue += contractRevenue;

      // Kiểm tra nếu `details` không tồn tại hoặc rỗng
      if (details.length === 0) {
        console.log(`No details found for contract: ${contract._id}`);
        continue;  // Bỏ qua hợp đồng nếu không tìm thấy chi tiết
      }
      console.log()
      // Thêm dữ liệu vào mảng kết quả
      data.push({
        contractId: contract._id,
        userName: contract?.userid?.firstname + " " + contract?.userid?.lastname, // Tên người thuê
        userEmail: contract?.userid?.email,  // Email người thuê
        carname: carItem?.carname || 'Unknown',  // Tên xe
        cartype: carItem?.cartype || 'Unknown',  // Loại xe
        image: carItem?.image ,  // Loại xe
        pricerent: carItem?.pricerent || 'Unknown',  // Loại xe
        totalPrice: contract?.totalprice,
        status: contract?.status,
        dayRent: details?.[0]?.dayrent || 0,
        deposits: details?.[0]?.deposits || 0,
        createdAt: contract.createdAt,
      });
    }

    // Trả dữ liệu về frontend
    res.status(200).json({ data, totalRevenue });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


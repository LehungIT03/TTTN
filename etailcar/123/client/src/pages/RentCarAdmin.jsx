import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import { fetchContactByAdmin, fetchRemoveContract, updateContract } from "../api"; // Giả sử bạn có API này
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from "@mui/material";

const RentCarAdmin = () => {
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [statusRentCar, setStatusRentCar] = useState({});
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var car_id_GET = urlParams.get("id");
    const user_Id = getCookie("user_Id");

    const [dataCar, setDataCar] = useState();

    useEffect(() => {
        fetchData();
        return () => {};
    }, []);

    const fetchData = async () => {
        const res = await fetchContactByAdmin({ userId: user_Id });
        setDataCar(res.data);
    };

    const handleDelete = async (selectedCar) => {
        if (selectedCar) {
            await fetchRemoveContract({ _id: selectedCar._id });
            await fetchData();
            setOpen(false);
        }
    };

    const handleOpenDialog = (car) => {
        setSelectedCar(car);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeStatus = async (e, contract) => {
        const newStatus = e.target.value;
        console.log(contract,  newStatus)
        // Gọi API để cập nhật trạng thái của hợp đồng
        await updateContract({ ...contract, status: newStatus });

        // Sau khi cập nhật trạng thái, tải lại dữ liệu
        await fetchData();
    };

    if (!dataCar)
        return (
            <div className="">
                <Header />
                <p>Loading....</p>
            </div>
        );

    return (
        <div className="mx-[5%]" style={{overflowY: 'scroll', height: '100vh'}}>
            <div className="flex flex-col gap-6" style={{gap: '25px', display: 'flex', flexDirection: 'column'}}>
                <h1 className="text-[16px]">Danh sách xe đang thuê</h1>
                {dataCar?.contracts?.map((item) => (
                    <div style={{margin: '16px', padding: '16px', border: '1px solid  #ccc'}} key={item._id} className="bg-gray-100 border-[1px]  shadow-md border-gray-500 rounded-md w-full">
                        <p>Trạng thái: {item?.status}</p>
                        <p>Tổng tiền: {item?.totalprice}</p>
                        <p>
                            Số ngày thuê:{" "}
                            {
                                dataCar?.detailsContracts?.find(
                                    (el) => item?._id == el?.contractid
                                )?.dayrent
                            }
                        </p>
                        <p>
                            Trả trước:{" "}
                            {
                                dataCar?.detailsContracts?.find(
                                    (el) => item?._id == el?.contractid
                                )?.deposits
                            }
                        </p>
                        <p>
                            Hãng xe:{" "}
                            {
                                dataCar?.cardDetail?.find(
                                    (el) =>
                                        dataCar?.detailsContracts?.find(
                                            (el) => item?._id == el?.contractid
                                        )?.carid == el?._id
                                )?.carcompany
                            }
                        </p>
                        <p>
                            Tên xe:{" "}
                            {
                                dataCar?.cardDetail?.find(
                                    (el) =>
                                        dataCar?.detailsContracts?.find(
                                            (el) => item?._id == el?.contractid
                                        )?.carid == el?._id
                                )?.carname
                            }
                        </p>
                        <p>
                            Loại xe:{" "}
                            {
                                dataCar?.cardDetail?.find(
                                    (el) =>
                                        dataCar?.detailsContracts?.find(
                                            (el) => item?._id == el?.contractid
                                        )?.carid == el?._id
                                )?.cartype
                            }
                        </p>
                        <p>
                            Đơn giá:{" "}
                            {
                                dataCar?.cardDetail?.find(
                                    (el) =>
                                        dataCar?.detailsContracts?.find(
                                            (el) => item?._id == el?.contractid
                                        )?.carid == el?._id
                                )?.pricerent
                            }
                        </p>
                        Thay đổi trạng thái: 
                        <Select
                            variant="outlined"
                            value={statusRentCar[item._id] || item.status}
                            onChange={(e) => handleChangeStatus(e, item)}
                        >
                            <MenuItem disabled={item.status == 'Đã đặt cọc' || item.status == 'Đã lấy xe' || item.status == 'Đã trả xe và thanh toán'} value={"Chờ duyệt đặt cọc"}>Chờ duyệt đặt cọc</MenuItem>
                            <MenuItem disabled={item.status == 'Đã lấy xe' || item.status == 'Đã trả xe và thanh toán'} value={"Đã đặt cọc"}>Đã đặt cọc</MenuItem>
                            <MenuItem disabled={item.status == 'Đã trả xe và thanh toán'} value={"Đã lấy xe"}>Lấy xe</MenuItem>
                            <MenuItem disabled={item.status == 'Đã trả xe và thanh toán'} value={"Đã trả xe và thanh toán"}>Đã trả xe và thanh toán</MenuItem>
                        </Select>
                    </div>
                ))}
            </div>

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Hủy đặt xe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn hủy xe này {selectedCar && selectedCar.carname} không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Không
                    </Button>
                    <Button onClick={() => handleDelete(selectedCar)} color="secondary">
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RentCarAdmin;

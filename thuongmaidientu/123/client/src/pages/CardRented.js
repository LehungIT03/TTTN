import React, { useEffect, useState } from "react";
import { fetchCar, fetchContactByUserId, fetchRemoveContract } from "../api";
import Header from "../components/Header";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CardRented = () => {
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
    const res = await fetchContactByUserId({ userId: user_Id });
    setDataCar(res.data);
  };
  const handleDelete = async (selectedCar) => {
    if (selectedCar) {
      // await removeCar(selectedCar._id);
      console.log(selectedCar);
      await fetchRemoveContract({ _id: selectedCar._id });
      fetchData();
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

  if (!dataCar)
    return (
      <div className="w-screen mx-[5%]">
        {" "}
        <Header />
        <p>Loading....</p>
      </div>
    );
  return (
    <div  className='w-[80vw] flex flex-col mx-auto '>
      <Header />
      <div className="flex flex-col gap-6" style={{gap: '24px', display: 'flex'}}>
        <div className="flex flex-col gap-6" style={{ margin: "0 5%" }}>
        <h1 className="mb-10 ">Danh sách xe đang thuê</h1>
          {dataCar?.contracts?.map((item) => (
            <div className="bg-gray-100 border-[1px] p-3 shadow-md border-gray-500  flex  gap-10  rounded-md w-full ">
              <div className="">
              <p>Trạng thái: {item?.status}</p>
              <p>Tông tiền: {item?.totalprice}</p>
              <p>
                Số này thuê:{" "}
                {
                  dataCar?.detailsContracts?.find(
                    (el) => item?._id == el?.contractid
                  )?.dayrent
                }
              </p>
              <p>
                Trả trước:
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
              <p>
                Số điện thoại:{" "}
                {
                  item.phone
                }
              </p>
              <p>
              Địa chỉ nhận xe:{" "}
                {
                  item.address
                }
              </p>
              <p>
                Tên người nhận:{" "}
                {
                  item.name
                }
              </p>
              <p>
                Ngày thuê:{" "}
                {
                  item.getCarDate
                }
              </p>
              <p>
                Ngày trả xe:{" "}
                {
                  item.carReturnDate
                }
              </p>
              { <Button disabled={item?.status !== 'Chờ duyệt đặt cọc'}
                className=""
                onClick={() => handleOpenDialog(item)}
                variant="contained"
                color="primary"
              >
                Hủy đặt xe
              </Button>}
              </div>
              <div>
                <img className="h-[120px] rounded-xl w-[120px]" src={dataCar?.cardDetail?.find(
                    (el) =>
                      dataCar?.detailsContracts?.find(
                        (el) => item?._id == el?.contractid
                      )?.carid == el?._id
                  )?.image} />
              </div>
           
            </div>
          ))}
        </div>
      </div>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Hủy đặt xe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn hủy xe này{" "}
            {selectedCar && selectedCar.carname} không?
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

export default CardRented;

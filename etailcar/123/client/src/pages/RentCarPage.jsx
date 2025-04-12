import * as React from "react";
import axios from "axios";
import qr from "../assets/qr.jfif";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function RentCarPage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = React.useState(false);

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

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

  function checkCookie(cname) {
    let cookie = getCookie("username");
    if (cookie != "") {
      return true;
    } else {
      return false;
    }
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const user_Id = getCookie("user_Id");
  console.log(user_Id);
  var getCar_success = -1;

  var car_id_GET = urlParams.get("id");
  console.log(car_id_GET);

  var car_id = { _id: car_id_GET };
  console.log(car_id);

  var car_carname_GET = urlParams.get("carname");
  console.log(car_carname_GET);

  var carDriver = urlParams.get("carDriver");

  var car_carname = { carname: car_carname_GET };
  console.log(car_carname);

  var car_pricerent_GET = urlParams.get("pricerent");
  console.log(car_pricerent_GET);

  var car_pricerent = { pricerent: car_pricerent_GET };
  console.log(car_pricerent);

  const [contract, setContract] = React.useState({
    userid: user_Id,
    totalprice: car_pricerent_GET,
    carid: car_id_GET,
    dayrent: 1,
    deposits: car_pricerent_GET,
    contractid: "",
    carname: car_carname_GET,
    pricerent: car_pricerent_GET,
    address: "",
    phone: "",
    name: "",
    getCarDate: new Date().toISOString().split("T")[0],
    carReturnDate: new Date().toISOString().split("T")[0]
  });

  const createContract = () => {
    var createContract_Success = -1;
    contract.carReturnDate = calculateReturnDate(contract.getCarDate, contract.dayrent)
    contract.totalprice =
      contract.dayrent * contract.pricerent +
      (carDriver == "true" ? 1000000 : 0);
    
    axios
      .post("http://localhost:5000/contracts/", contract)
      .then((res) => {
        const contractid = res.data._id;
        contract.contractid = contractid;

        axios
          .post("http://localhost:5000/detailscontracts/", contract)
          .then((res) => {
            createContract_Success = 1;
            alert("Thuê thành công !");
            navigate("/xe-thue");
          })
          .catch((err) => {
            if (createContract_Success != 1) {
              console.log(err);
              alert("Chưa đầy đủ thông tin !");
            }
          });
      })
      .catch((err) => {
        if (createContract_Success != 1) {
          console.log(err);
          alert("Chưa đầy đủ thông tin !");
        }
      });
  };

  const [open, setOpen] = React.useState(false); // State để kiểm soát modal
  const [paymentMethod, setPaymentMethod] = React.useState("online");
  const [open2, setOpen2] = React.useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod == "online") {
      setOpen(true);
    } else {
      createContract();
    }
  };
  const handleOpen = () => {
    setOpen(true); // Mở modal khi nhấn nút "Thanh toán"
  };

  const handleClose = () => {
    setOpen(false); // Đóng modal khi người dùng nhấn ra ngoài hoặc nhấn nút "Đóng"
  };
  const calculateReturnDate = (getCarDate, dayrent) => {
    if (!getCarDate || !dayrent) return ""; // Kiểm tra nếu không có giá trị

    const getCarDateObj = new Date(getCarDate); // Chuyển đổi chuỗi ngày sang đối tượng Date
    getCarDateObj.setDate(getCarDateObj.getDate() + parseInt(dayrent)); // Cộng thêm số ngày thuê

    return getCarDateObj.toISOString().split("T")[0]; // Chuyển đổi lại thành chuỗi định dạng YYYY-MM-DD
  };
  if (checkCookie("username") == false) return navigate("");
  else {
    return (
      <Container maxWidth="lg" className="mx-auto">
        <Header />
        <div
          className={` w-full flex flex-col gap-4 mx-auto mt-10 shadow-md p-8 rounded-md container-form-contract`}
        >
          <h1>Lập hợp đồng</h1>
          {carDriver == "true" && <div>Có tài xế + 1.000.000 Đ</div>}
          <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-4">
          <TextField
            disabled
            type="text"
            name="carname"
            value={contract.carname}
            label="Tên xe"
            onChange={(e) =>
              setContract({ ...contract, carname: e.target.value })
            }
          />

          <TextField
            disabled
            type="number"
            name="CarPrice"
            value={contract.pricerent}
            label="Giá thuê xe"
            onChange={(e) =>
              setContract({ ...contract, pricerent: e.target.value })
            }
          />

          <TextField
            disabled
            type="number"
            name="CarPrice"
            value={
              contract.pricerent * contract.dayrent +
              (carDriver == "true" ? 1000000 : 0)
            }
            label="Tổng tiền"
            onChange={(e) =>
              setContract({ ...contract, totalprice: e.target.value })
            }
          />

          <TextField
            type="number"
            name="DayRent"
            value={contract.dayrent}
            min="0"
            onChange={(e) =>
              setContract({ ...contract, dayrent: e.target.value })
            }
            label="Số ngày thuê"
          />

          <TextField
            type="date"
            name="getCarDate"
            value={contract.getCarDate}
            onChange={(e) =>
              setContract({ ...contract, getCarDate: e.target.value })
            }
            label="Ngày lấy xe"
          />
          </div>
          <div className="flex flex-col gap-4 w-full"> 
          <TextField
            type="date"
            name="carReturnDate"
            value={calculateReturnDate(contract.getCarDate, contract.dayrent)}
            label="Ngày trả xe"
          />

          <TextField
            type="number"
            name="Deposits"
            value={contract.deposits}
            onChange={(e) =>
              setContract({ ...contract, deposits: e.target.value })
            }
            label="Tiền đặt cọc"
            disabled
          ></TextField>
          <TextField
            type="text"
            name="address"
            value={contract.address}
            onChange={(e) =>
              setContract({ ...contract, address: e.target.value })
            }
            label="Địa chỉ"
          ></TextField>
          <TextField
            type="text"
            name="phone"
            value={contract.phone}
            onChange={(e) =>
              setContract({ ...contract, phone: e.target.value })
            }
            label="Số điện thoại"
          ></TextField>
          <TextField
            type="text"
            name="name"
            value={contract.name}
            onChange={(e) => setContract({ ...contract, name: e.target.value })}
            label="Tên người nhận"
          ></TextField>
          </div>
          </div>
          <Button
            size="large"  sx={{mx:'auto'}}
            className={`w-[125px] mx-auto text-[16px] text-white`}
            variant="contained"
            onClick={() => setIsOnline(true)}
          >
            Đặt xe
          </Button>
        </div>
        <Modal onClose={() => setIsOnline(false)} open={isOnline}>
          <Container
            maxWidth="sm"
            className="payment-method-selection bg-white w-1/2  p-10 flex flex-col m-auto mt-[200px] bg-white"
            style={{
              width: "50%",
              padding: "2.5rem", // 10 * 0.25rem = 2.5rem
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              marginTop: "200px",
              backgroundColor: "white",
            }}
          >
            <h2 className="font-bold text-[20px]">Xác nhận đặt cọc</h2>
            <div className="flex flex-col mt-4">
              <h1>Thông tin đặt xe</h1>
              <p>Tên người đặt: {contract.name}</p>
              <p>Địa chỉ: {contract.address}</p>
              <p>Tên xe: {contract.carname}</p>
              <p>Ngày đặt: {new Date(Date.now()).toLocaleDateString()}</p>
              <p>Ngày lấy xe: {contract.getCarDate}</p>
              <p>Ngày trả xe: {calculateReturnDate(contract.getCarDate, contract.dayrent)}</p>
              <p>Tiền đặt cọc: {contract.deposits} </p>
            </div>
            <div className="flex mt-10 gap-10 ml-auto">
              <Button variant="contained" color="error" onClick={() => setIsOnline(false)}>
                Hủy
              </Button>
              <Button onClick={() => setOpen(true)} variant="contained" color="success">
                Đặt cọc xe
              </Button>
            </div>

            {/* <h2>Chọn phương thức thanh toán</h2>
            <FormControl component="fieldset">
              <FormLabel component="legend">Phương thức thanh toán</FormLabel>
              <RadioGroup
                aria-label="payment-method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="Thanh toán ngay"
                />
                <FormControlLabel
                  value="offline"
                  control={<Radio />}
                  label="Thanh toán khi nhận xe"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmPayment}
              className="mt-4"
            >
              Xác nhận
            </Button> */}
          </Container>
        </Modal>
        <Modal
          open={open} // Kiểm soát việc mở/đóng modal bằng state
          onClose={handleClose} // Đóng modal khi người dùng nhấn ra ngoài
        >
          <div
            className="w-1/2  p-10 flex flex-col m-auto mt-[200px] bg-white"
            style={{
              width: "50%",
              padding: "2.5rem", // 10 * 0.25rem = 2.5rem
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              marginTop: "200px",
              backgroundColor: "white",
            }}
          >
            <img src={qr} width={200} height={200} className="mb-10 mx-auto" />
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={` mx-auto mt-10 text-[16px] text-white`}
              onClick={createContract}
            >
              Xác nhận thanh toán
            </Button>
          </div>
        </Modal>
        {/* <Modal open={open2} onClose={() => setOpen2(false)}>
          <div
            className="w-1/2  p-10 flex flex-col m-auto mt-[200px] bg-white"
            style={{
              width: "50%",
              padding: "2.5rem", // 10 * 0.25rem = 2.5rem
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              marginTop: "200px",
              backgroundColor: "white",
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={` mx-auto mt-10 text-[16px] text-white`}
              onClick={createContract}
            >
              Xác nhận thanh toán khi nhận xe
            </Button>
          </div>
        </Modal> */}
      </Container>
    );
  }
}

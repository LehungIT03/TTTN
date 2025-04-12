import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng
import Header from "../components/Header";
import { modalState$ } from "../redux/selectors";
import { createUser, hideModal_User } from "../redux/actions";
import { Button, Container, TextField } from "@mui/material";

export default function RegisterPage() {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    identify: "",
    email: "",
    phonenumber: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal_User());
    setData({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      identify: "",
      email: "",
      phonenumber: "",
    });
  }, [dispatch]);

  const onSubmit = (e) => {
    console.log(123)
    e.preventDefault(); // Ngăn trang tải lại
    try {
      dispatch(createUser.createUserRequest(data));
      alert("Đăng ký thành công!");
      navigate('/dang-nhap/'); // Điều hướng sau khi thành công
    } catch (error) {
      alert("Cần điền đủ thông tin!");
    }
  }
 

  return (
    <div  className='w-[80vw] flex flex-col mx-auto '>
      <Header />
      <div className="flex mx-auto flex-col w-[50%] " id="simple-modal-username">
        <h2 className="text-[15px] font-bold text-center mb-10">Create User</h2>
        <form className="flex flex-col gap-4">
          <TextField  
            required
            label="Tên tài khoản"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />

          <TextField 
            required
            label="Họ"
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />

          <TextField 
            required
            label="Tên"
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />

          <TextField 
            required
            label="CMND"
            value={data.identify}
            type="number"
            onChange={(e) => setData({ ...data, identify: e.target.value })}
          />

          <TextField 
            required
            label="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <TextField 
            required
            label="Số điện thoại"
            value={data.phonenumber}
            type="number"
            onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
          />

          <TextField 
            required
            label="Mật khẩu"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <div className="mt-10">
            <Button size="large"
              variant="contained" onClick={onSubmit}
              color="primary"
              component="span"
              fullWidth type="submit"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

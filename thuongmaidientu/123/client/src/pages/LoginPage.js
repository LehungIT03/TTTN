import React from "react";
import axios from "axios";
import Header from "../components/Header";
import useStyles from "./styles";
import { useNavigate, useRoutes } from "react-router-dom";
import { Button, Container, TextField } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

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

  const login = (e) => {
    e.preventDefault()
    var login = 0;
    axios
      .post("http://localhost:5000/users/login", user)
      .then((res) => {
        alert("Đăng nhập thành công ! Xin chào " + res.data.username);
        login = 1;
        setCookie("username", res.data.username, 365);
        setCookie("user_Id", res.data._id, 365);
        setCookie("user_role", res.data.quyen.tenquyen, 365);
        navigate("/");
      })
      .catch((err) => {
        if (login != 1) {
          console.log(err);
          alert("Đăng nhập thất bại !");
        }
      });
  };

  return (
    <div className="w-[80vw] flex flex-col mx-auto " 
    style={{
      width: '80vw', display: 'flex', flexDirection: 'column', margin: '0 auto 0 auto'
    }}>
      <Header />
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form onSubmit={e => login(e)} className="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  label="Nhập mật khẩu"
                  className="login__input"
                  placeholder="Nhập tên tài khoản"
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  name="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="login__input"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button type="submit" class="button login__submit">
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

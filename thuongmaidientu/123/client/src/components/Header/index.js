import React from "react";
import { Link } from "react-router-dom";
import {} from "../../index.css";

export default function Header() {
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
    let cookie = getCookie(cname);
    if (cookie != "") {
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    setCookie("username", "", -1);
    setCookie("user_Id", "", -1);
    setCookie("user_role", "", -1);
    window.location.replace("http://localhost:3000/");
  };

  if (checkCookie("username") == false)
    return (
      <nav className="navbar navbar-light shadow-md">
        <div class="container-fluid">
          <div class="navbar-header">
            <Link class="navbar-brand fas fa-hotel" to="/">
              Shop2nd
            </Link>
          </div>
          <ul class="nav navbar-nav flex items-center">
            <li>
              <Link to="/danh-sach-xe">Danh sách sản phẩm</Link>
            </li>
            <li>
              <Link to="/danh-sach-nguoi-dung">Danh sách người dùng</Link>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to="/dang-nhap">
                <span class="glyphicon glyphicon-user"></span> Đăng nhập
              </Link>
            </li>
            <li>
              <Link to="/dang-ky">
                <span class="glyphicon glyphicon-log-in"></span> Đăng ký
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  else {
    const username = getCookie("username");
    const user_Id = getCookie("user_Id");
    const user_role = getCookie("user_role");

    return (
      <nav className="navbar navbar-light shadow-md">
        <div class="container-fluid">
          <div class="navbar-header">
            <Link class="navbar-brand fas fa-hotel" to="/">
              Shop 2nd
            </Link>
          </div>

          <ul class="nav navbar-nav">
            <li>
              <Link to="/danh-sach-xe">Danh sách sản phẩm</Link>
            </li>
            {/* <li><Link to="">Dịch vụ</Link></li> */}
            <li>
              <Link to="/xe-thue">sản phẩm đang thuê</Link>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li>
              <Link to="/admin">
                <span class="glyphicon glyphicon-user"></span> {user_role}{" "}
                {username}{" "}
              </Link>
            </li>
            <li>
              <Link to="" onClick={logout}>
                <span class="glyphicon glyphicon-log-in"></span> Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

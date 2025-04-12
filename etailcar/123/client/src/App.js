import HomePage from './pages/HomePage';
import CarListPage from './pages/CarListPage';
import LoginPage from './pages/LoginPage';
import { Routes,Router, Route,Navigate } from "react-router-dom";
import RentCarPage from './pages/RentCarPage';
import RegisterPage from './pages/RegisterPage';
import UsersListPage from './pages/UsersListPage';
import CardDetail from './pages/CardDetail';
import CardRented from './pages/CardRented';
import AdminCar from './pages/CardAdmin';
import AdminPage from './pages/Admin';

 function App() {
    return (
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route path="danh-sach-xe" element={<CarListPage/>} />

          <Route path="danh-sach-nguoi-dung" element={<UsersListPage/>} />

          <Route path="dang-nhap" element={<LoginPage/>} />

          <Route path="dang-ky" element={<RegisterPage/>} />
          <Route path="xe-thue" element={<CardRented/>} />
          
          <Route path="card-detail"  >
            <Route element={<CardDetail/>} path='?id' />
            <Route element={<CardDetail/>} path='' />
          </Route>
          <Route path='admin' element={<AdminPage />} />

          <Route path="thue-xe" >
            <Route path="?id" element={<RentCarPage/>} />
            <Route path="" element={<RentCarPage/>} />
          </Route>
        </Routes>
      );
}

export default App;
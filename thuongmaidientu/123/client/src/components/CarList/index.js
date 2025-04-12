import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Car from "./Car";
import { carsState$ } from "../../redux/selectors";

export default function CarList() {
  const dispatch = useDispatch();
  const cars = useSelector(carsState$);
  const [search, setSearch] = useState('');
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    dispatch(actions.getCars.getCarsRequest());
  }, [dispatch]);

  useEffect(() => {
    // Lọc danh sách xe khi tìm kiếm thay đổi
    if (search !== '') {
      setCarList(cars.filter(item => item.carname?.toLowerCase().includes(search?.toLowerCase())));
    } else {
      // Nếu không có tìm kiếm, hiển thị tất cả các xe
      setCarList(cars);
    }
  }, [search, cars]);

  return (
    <div>
      <div className="pro-card-head-extra my-10">
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Tìm xe nổi bật của bạn"
          className="ml-auto"
        />
        <div className="search-icon-sub"></div>
      </div>
      <div className="flex flex-wrap">
        {carList.map((car) => (
          <Car key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import Car from "./CarList/Car";
import { carsState$ } from "../redux/selectors";
// Cấu hình Swiper

const CarSlide = () => {
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
    <>
      <Swiper
        dir="rtl" 
        navigation={true}   spaceBetween={10}
        slidesPerView={5} loop={true} 
        pagination={{
          clickable: true,
        }}
        autoplay={{
            "delay": 1000,
            "disableOnInteraction": false,
            "pauseOnMouseEnter": false,
            "stopOnLastSlide": false,
            "waitForTransition": true
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {carList.map((item => {
          return         <SwiperSlide>
          <Car key={item.id} car={item} />
     </SwiperSlide>
        }))}
      </Swiper>
    </>
  );
};

export default CarSlide;

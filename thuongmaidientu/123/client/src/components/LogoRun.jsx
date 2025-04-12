import img1 from "../assets/logo-bmw.jpg";
import img2 from "../assets/logo-mazda.jpg";
import img3 from "../assets/logo-nissan.jpg";
import img4 from "../assets/brasol.vn-logo-huyndai-huyndai.jpg";
import img5 from "../assets/logovw.jpg";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Cấu hình Swiper

const LogoRun = () => {
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
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default LogoRun;

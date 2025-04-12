import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const SlideShow = () => {
  return (
    <div>
         <Swiper style={{height: '100%'}}
        dir="rtl" 
        navigation={true}   spaceBetween={10}
        slidesPerView={1} loop={true} 
        pagination={{
          clickable: true,
        }}

        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="h-[500px]" style={{height: '500px'}}>
          <img src={img1} className="object-fill h-[500px] w-full" style={{objectFit: 'cover'}} alt="" />
        </SwiperSlide>
        <SwiperSlide  className="h-[500px]" style={{height: '500px'}}>
          <img src={img2} className="object-fill h-[500px] w-full"  style={{objectFit: 'cover'}} alt="" />
        </SwiperSlide>
        <SwiperSlide  className="h-[500px]" style={{height: '500px'}}>
          <img src={img3} className="object-fill h-full w-full"  style={{objectFit: 'cover'}} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SlideShow
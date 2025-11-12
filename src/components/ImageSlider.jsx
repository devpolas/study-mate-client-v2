import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import SlideCard from "./SlideCard";

export default function ImageSlider() {
  return (
    <div className='pt-4 relative z-1'>
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={"auto"}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        speed={3000}
        loop={true}
        allowTouchMove
        breakpoints={{
          1024: { slidesPerView: 1 },
          1280: { slidesPerView: 2 },
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
      >
        {Array.from({ length: 3 }, (_v, i) => (
          <SwiperSlide>
            <SlideCard key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

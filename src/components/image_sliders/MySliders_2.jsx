// install the package
// npm install swiper

// import libraries
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const MySwiperSlider_2 = () => {
  const images = [1, 2, 3, 4, 5];

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      loop={true}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="h-48 bg-purple-300 rounded-lg flex items-center justify-center text-3xl font-bold shadow-md">
            {img}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiperSlider_2;

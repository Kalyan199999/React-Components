// Required installs:
// npm i react-slick slick-carousel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

// Image data
const images = [1, 2, 3, 4, 5];

const MySliders = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true, 
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-600">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-4">
            <div className="h-48 rounded-xl border-2 border-purple-500 bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center justify-center text-3xl font-bold shadow-md hover:scale-105 transition-transform">
              {image}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MySliders;
import React from 'react'
import Slider from "react-slick";

import './Style.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderShow() {
  var settings = {
    dots: true,
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    // className: "center",
    centerMode: true,

    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (

    <Slider {...settings}>
      <div>
        <img src="https://imgg.mangaina.com/2c10eaf1db77b8028538a287dda9034c.jpg" alt="" />
      </div>
      <div>
        <img src="https://imgg.mangaina.com/84f6974b2a41aa1608ff3fc35cd5575d.jpg" alt="" />
      </div>
      <div>
        <img src="https://imgg.mangaina.com/3b29dd7067b5f1458b03bf8d87fcade1.jpg" alt="" />
      </div>
      <div>
        <img src="https://imgg.mangaina.com/eac2a50ff4f4d17f71e0adda79398745.jpg" alt="" />
      </div>
      <div>
        <img src="https://imgg.mangaina.com/a5d0e21e6807ef004d961fe84086d6e2.jpg" alt="" />
      </div>
    </Slider>

  );
}

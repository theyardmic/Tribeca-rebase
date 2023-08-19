import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
       
        ThumbWidth={60}
        showIndicators={false}
        showStatus={false}
        className="productCarousel"
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        showDots={true}
      >
        {images.map((img) => (
          <img
            key={img.attributes.id}
            src={img.attributes.url}
            alt={img.attributes.name}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;

import dynamic from "next/dynamic";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack, BiArrowNext } from "react-icons/bi";

const HeroCarousel = () => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              onClick={clickHandler}
              className="absolute right-[3px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] 
            md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
              <BiArrowBack className="text-sm md:text-lg" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              onClick={clickHandler}
              className="absolute right-0  bottom-0 w-[30px] md:w-[50px] h-[30px] 
              md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
            >
              <BiArrowBack className="rotate-180 text-sm md:text-lg" />
            </div>
          );
        }}
      >
      
        <div>
          <img
            src="slide-1.png"
            className="aspect-[16/10] h-[525px] w-[1200]  md:aspect-auto object-cover"
          />

          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-urbanist bg-white absolute bottom-[25px] md:bottom-[75px]
      left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            African Coffee and Tea
          </div>
        </div>

        <div>
          <img
            src="slide-2.png"
            className="aspect-[16/10] h-[525px] w-[1200]  md:aspect-auto object-cover"
          />

          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-urbanist bg-white absolute bottom-[25px] md:bottom-[75px]
      left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
           African Collectibles
          </div>
        </div>

        <div>
          <img
            src="slide-6.webp"
            className="aspect-[16/10] h-[525px] w-[1200] md:aspect-auto object-cover"
          />

          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-Oswald bg-white absolute bottom-[25px] md:bottom-[75px]
      left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-bold cursor-pointer hover:opacity-90"
          >
          Home and Living
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HeroCarousel), { ssr: true });

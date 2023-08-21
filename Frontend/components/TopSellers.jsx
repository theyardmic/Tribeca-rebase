import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const TopCategories = ({ products }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1023, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="mt-[45px] md:mt-[80px] mb-[100px] md:mb-0 ">
    
            <Carousel
                responsive={responsive}
                containerClass="mx-[10px]"
                itemClass="px-[10px]"
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                transitionDuration={500}
                
            >
                {products?.data?.map((product) => (
                    <ProductCard key={product?.id} data={product} />
                ))}
            </Carousel>
        </div>
    );
};

export default TopCategories;

export async function getStaticPaths() {
    const products = await fetchDataFromAPi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
      params: {
        slug: p.attributes.slug,
      },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromAPi(
      `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromAPi(
      `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );
  
    return {
      props: {
        product,
        products,
      },
    };
  }
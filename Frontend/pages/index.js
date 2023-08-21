import React from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromAPi } from "@/utils/api";
import { useState, useEffect } from "react";
import TopCategories from "@/components/TopSellers";
import Features from "@/components/Features";


export default function Home({ products }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await fetchDataFromAPi("/api/products?populate=*");
    setData(data);
  };

  return (
    <main className="">
      <HeroCarousel />

      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-2xl md:text-xl  lg:text-3xl  text-[#BF330E]  mb-5 font-bold leading-tight">
            Discover the Treasure of Africa at African Tribeca
          </div>
          <div className="text-md md:text-xl">
            African Tribeca is your best online store in supplying quality
            African art and Craft, Tea, Coffee, Macadamia nuts among other
            authentic African Items. These days, we've seen items labeled as
            "African art" being produced in China and sold under the label. But
            don't worry, that's not the case with us.
          </div>
        </div>

        {/*
         Product Cards 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
      */}
     <div className="text-2xl md:text-xl  lg:text-3xl  text-[#BF330E]  mb-5 font-bold leading-tight">
        <h1>Our Top Sellers</h1>   
        < TopCategories products={products}/>
          </div>
          <Features />
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromAPi("/api/products?populate=*");
  return { props: { products } };
}



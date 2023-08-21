import React, { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromAPi } from "@/utils/api";
import TopCategories from "@/components/TopSellers";
import Features from "@/components/Features";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";

export default function Home({ products }) {
  return (
    <main className="">
      <HeroCarousel />

      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-2xl md:text-xl lg:text-3xl text-[#BF330E] mb-5 font-bold leading-tight">
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
        {/*}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>

        */}

        <div className="text-2xl md:text-4xl lg:text-4xl text-[#BF330E] mb-3 font-bold leading-tight">
          <h1 className="text-center">Our Top Sellers</h1>
          <TopCategories products={products} />
        </div>
        <Features />
        <div className="text-xl md:text-4xl lg:text-4xl text-center text-[#BF330E] mb-2 font-bold leading-tight">
          Shopping for Authentic African Products has never been this easy
        </div>
        <Steps />

        <div className="text-xl md:text-4xl lg:text-4xl text-center text-[#BF330E] mb-2 font-bold leading-tight">
          What are they saying about Tribecka?
        </div>

        <Testimonials />

        <div className="text-xl md:text-4xl lg:text-4xl text-center text-[#BF330E] mb-2 font-bold leading-tight">
          Our Partners
        </div>
        <Partners className="mb-3" />
        <h1 className="text-xl md:text-4xl lg:text-4xl text-center text-[#BF330E] mt-4  font-bold leading-tight">
          For enquiries, Contact us at:
        </h1>
        <Contact />
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromAPi("/api/products?populate=*");
  return { props: { products } };
}

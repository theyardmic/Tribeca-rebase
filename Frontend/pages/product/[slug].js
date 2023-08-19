import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromAPi } from "@/utils/api";
import { useRouter } from "next/router";
import { React, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const p = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const notify = () => {
    toast.success(`${p.name} Added to cart Successfully!`, {
      position: "bottom-right",
      font: "Urbanist",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastClassName: 'custom-toast',
    });
  };

  return (
    <div className="w-full md:py-20">
         <ToastContainer className="font-Urbanist"/>
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/** Start Left Side */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:nax-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>

          {/** End Left Side */}

          {/** Start Right Side */}

          <div className=" flex-[1] py-3">
            {/**PRODUCT TITLE */}
            <div className="">
              <div className="text-[24px] md:text-3xl font-semibold whitespace-normal mb-2">
                {p.name}
              </div>
            </div>

            {/**PRODUCT SUBTITLE */}

            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">MSRP : ${p.price}</p>
              {p.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    ${p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>

            {/** Product SIze Range Start */}

            <div className="mb-10">
              {/**Heading Start */}
              {/*
<div className="flex justify-between mb-2">
  <div className="text-md font-semibold">Select Size</div>
  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
    Select Guide
  </div>
</div>
*/}

              {/**Heading End */}

              {/**Range size start */}
              {/* SIZE START */}
              {/* 
<div id="sizesGrid" className="grid grid-cols-3 gap-2">
  {p.size.data.map((item, i) => (
    <div
      key={i}
      className={`border rounded-md text-center py-3 font-medium ${
        item.enabled
          ? "hover:border-black cursor-pointer"
          : "cursor-not-allowed bg-black/[0.1] opacity-50"
      } ${selectedSize === item.size ? "border-black" : ""}`}
      onClick={() => {
        setSelectedSize(item.size);
        setShowError(false);
      }}
    >
      {item.size}
    </div>
  ))}
</div>
*/}
              {/* SIZE END */}

              {/** Product SIze Range End */}
              {/**Selection error start */}
              {/* <div className="text-red-700 mt-3"> *Size selection Required</div> */}
              {/**Selection error end */}
            </div>

            {/**Add to Cart Start */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product?.data?.[0],
                    oneQuantityPrice: p.price,
                  })
                );
                notify(p.name);
              }}
            >
              Add to cart
            </button>
            {/**Add to Cart End */}

            {/**WishList */}
            <button className="w-full py-4 rounded-full border border-black  bg-black text-white text-lg font-medium flex  items-center justify-center gap-2 hover:opacity-75 transition-transform active:scale-95 mb-10">
              Add to Wishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/**WIshList End */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="text-md mb-5">
                <div className="markdown text-md  mb-5">
                  <ReactMarkdown>{p.description}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/** End Right Side */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

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

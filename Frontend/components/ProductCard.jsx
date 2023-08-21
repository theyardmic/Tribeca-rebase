import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDiscountedPricePercentage } from "@/utils/helper";

const ProductCard = ({ data }) => {
  // Check if data is available
  if (!data) {
    return <div>Error: Product data is missing.</div>;
  }

  const { name, price, original_price, slug, thumbnail } = data.attributes;

  // Check if thumbnail data is available
  const thumbnailUrls =
    thumbnail?.data?.map((item) => item.attributes?.url) || [];

  return (
    <Link
      href={`/product/${slug}`}
      className="cursor-pointer hover:scale-105 duration-300 overflow-hidden transform"
      style={{
        width: "350px", // Set a fixed width for the card
        display: "inline-block", // Make the cards appear next to each other
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a soft shadow
        borderRadius: "8px", // Rounded corners
      }}
    >
      <div
        className="w-full h-0 pb-[100%] relative rounded"
        style={{ overflow: "hidden" }}
      >
        {thumbnailUrls.length > 0 ? (
          <Image
            layout="fill"
            objectFit="cover" // Maintain aspect ratio and cover entire space
            src={thumbnailUrls[0] || ""}
            alt={name}
          />
        ) : (
          <div className="w-full h-full bg-gray-800"></div>
        )}
      </div>
      <div className="p-4 text-black">
        <h2 className="text-lg font-extra-bold">{name}</h2>

        <div className="flex items-center text-black">
          <p className="mr-2 text-lg text-green-600 font-bold">{`$${price}`}</p>
   
          {original_price && (
            <>
              <p className="text-base font-medium line-through">{`$${original_price}`}</p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(original_price, price)}% Off
              </p>
              
            </>
          )}
                 <button
            href={`/product/${slug}`}
            class="flex items-center mt-3 rounded-md bg-[#BF330E]  px-4 py-3 ml-24 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          
          
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

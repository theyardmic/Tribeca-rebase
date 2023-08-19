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
          <p className="mr-2 text-lg font-bold">{`$${price}`}</p>
          {original_price && (
            <>
              <p className="text-base font-medium line-through">{`$${original_price}`}</p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(original_price, price)}% Off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

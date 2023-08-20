import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Success = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-[#008000]/[100]  mx-auto flex flex-col">
                    <div className="text-2xl font-bold">
                        Thank you for shopping with us!
                    </div>
                    <div className="text-lg text-[#008000]/[1]  font-bold mt-2">
                        Your order has been placed successfully.
                    </div>
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    <div className="underline">tribeckasupport@shop.com</div>

                    <Link href="/" className="font-bold text-[#008000]/[1]  mt-5">
                        Continue Shopping
                    </Link>
                </div>
     
            </Wrapper>
        </div>
    );
};

export default Success;
import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";

const Failed = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="max-w-[600px] rounded-lg p-5 border border-[#ff0000]/[1]  mx-auto flex flex-col">
                    <div className="text-2xl text-[#ff0000]/[1]  font-bold">Payment failed!</div>
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

export default Failed;
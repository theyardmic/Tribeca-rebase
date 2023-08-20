import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import Mobile_Header from "./Mobile_Menu";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromAPi } from "@/utils/api";
import { useSelector } from "react-redux";

const Nav_Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("transalate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  const controlHeader = () => {
    if (window.scrollY > 200 && !mobileMenu) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await fetchDataFromAPi("/api/categories?populate=*");
    setCategories(data);
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center
    justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
      <Link href="/">
          <div className="flex items-center  space-x-4 md:-space-x-6 -md:px-4 cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={50}
              height={5}
              className="rounded-full -ml-4   md:mr-4 -sm:mr-3"
            />
            <h1 className="text-2xl md:px-4  text-[#BF330E]  font-bold">Tribecka</h1>
          </div>
        </Link>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />
        <div className="flex items-center gap-2 text-black">
          {mobileMenu && (
            <Mobile_Header
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}
            />
          )}

          {/*Wishlist Icon Start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center over:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[15px] text-[#BF330E] w-8 h-7 md:text-[20px]" />
            <div className="md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-[white] text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              8
            </div>
          </div>

          {/*WishList Icon End */}

          {/* Icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] w-8 h-7 text-[#BF330E] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/**Mobile Menu Start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center over:bg-black/[0.05] cursor-pointer -mr-2 relative">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px] w-8 h-7 text-[#BF330E]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px] w-8 h-7 text-[#BF330E]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/**Mobile Menu end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Nav_Header;

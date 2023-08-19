import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import dynamic from "next/dynamic";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Mobile_Header = ({ showCatMenu, setShowCatMenu, setMobileMenu, categories }) => {
  return (
    <ul
      className="md:hidden flex flex-col font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)]
    bg-white border text-black"
    >
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li className="cursor-pointer py-4 px-5 border-b">
                <div
                  className="flex items-center gap-2 relative"
                  onClick={() => setShowCatMenu(!showCatMenu)}
                >
                  <div className="flex justify-between items-center">
                    {item.name}
                    <BsChevronDown size={14} className="ml-1" />
                  </div>
                </div>

                {showCatMenu && (
                  <ul className="bg-black/[0.05] mt-2">
                     {categories?.map(({attributes: c, id}) => {
                      return (
                        <Link
                        key={id}
                        href={`/category/${c.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="py-4 px-8  border-b flex justify-between rounded-xl">
                          {c.name}
                          <span className="opacity-50 text-sm"> 
                            {`(${c.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-4 border-t justify-between">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  <Link href="" className="cursor-pointer">
                    {item.name}
                  </Link>
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default dynamic(() => Promise.resolve(Mobile_Header), { ssr: false });

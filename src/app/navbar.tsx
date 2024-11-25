"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import Login from "@/components/login";

//[0] => Name, [1] => URL
const personal = [
  ["Суурин утас", "/products/single"],
  ["Хосолсон багц", "/products/double"],
  ["Гуравласан багц", "/products/triple"],
  ["National КаТВ", "/products/catv"],
  ["TVROOM", "/products/iptv"],
  ["MIP70", "/products/sip"],
];
const corporate = [
  ["Суурин утас", "/products/corporate/single"],
  ["Хосолсон багц", "/products/corporate/double"],
  ["National КаТВ", "/products/corporate/catv"],
  ["TVROOM", "/products/corporate/iptv"],
  ["Call Center", "/products/corporate/callcenter"],
  ["Бодит хурдны интернет", "/products/corporate/dedicated"],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleOpen=()=>{
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }
  const handleClose=()=>{
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }
  return (
    <div>
      <header className="relative border-b border-slate-50/20 z-50 bg-gradient-to-r from-[#135EA5] from-10% to-[#00AFEF] to-100%">
        <nav className="container h-20 text-slate-50 font-medium tracking-tight flex items-center justify-between text-[14px]">
          <Link href="/" className="relative h-full w-32">
            <Image
              src="/assets/images/logo_white.png"
              fill
              alt="logo"
              className="object-contain py-1"
              sizes="(max-width: 300px) 40vw"
            />
          </Link>
          <div className="h-full flex gap-6">
            {/* <Link href="/" className="relative h-full w-24">
                        <Image src="/assets/images/logo.png" fill alt="logo" className="object-contain py-2"/>
                    </Link> */}
            <ul className="hidden md:flex gap-4 items-center h-full">
              <li className="group h-full flex items-center cursor-pointer relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
                <span className="flex items-center gap-1 flex-nowrap">
                  Өрхийн хэрэглэгч
                  <BsChevronDown className="text-sm" />
                </span>
                <ul className="hidden absolute top-full w-52 group-hover:flex flex-col text-slate-800 text-sm font-normal bg-slate-50 rounded-2xl shadow-md py-4 px-8 -ml-8 border border-slate-200 z-50">
                  {personal.map((product) => (
                    <DropdownItem
                      name={product[0]}
                      url={product[1]}
                      key={product[0]}
                    />
                  ))}
                </ul>
              </li>
              <li className="group h-full flex items-center cursor-pointer relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
                <span className="flex items-center gap-1">
                  Байгууллага
                  <BsChevronDown className="text-sm" />
                </span>
                <ul className="hidden absolute top-full w-60 group-hover:flex flex-col text-slate-800 text-sm font-normal bg-slate-50 rounded-2xl shadow-md py-4 px-8 -ml-8 border border-slate-200 z-50">
                  {corporate.map((product) => (
                    <DropdownItem
                      name={product[0]}
                      url={product[1]}
                      key={product[0]}
                    />
                  ))}
                </ul>
              </li>
              <Link
                href="/bonus"
                className="h-full flex items-center relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all"
              >
                Урамшуулал
              </Link>
              <Link
                href="/news"
                className="h-full flex items-center  relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all"
              >
                Мэдээлэл
              </Link>
              <Link
                href="/help"
                className="h-full flex items-center relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all"
              >
                Тусламж
              </Link>
              {/* <Link href="/help" className="h-full flex items-center relative after:absolute after:content-[''] after:border-b-4 after:border-brand-3 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">Бидний тухай</Link> */}
            </ul>
          </div>
          <div className="hidden md:flex h-full text-slate-50 tracking-tight">
            <Login />
          </div>
          {/* DESKTOP MENU ENDS */}
          {/* START OF MOBILE MENU */}
          <div className="block md:hidden">
            <button
              className="text-slate-50 text-xl"
              onClick={() => handleOpen()}
            >
              <AiOutlineMenu />
            </button>
            <div
              className={`${isOpen ? "fixed" : "scale-0"}`}
              onClick={() => handleClose()}
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                  className={`fixed right-0 bg-brand-1/80 w-[70%] h-full transition-transform delay-75 ease-linear ${
                    isOpen ? "translate-x-2" : "translate-x-full"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-right mr-6 mt-4">
                    <button
                      className="text-slate-50 text-2xl"
                      onClick={() => handleClose()}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
             
                  <ul className="ml-8 text-[18px] flex flex-col gap-2">
                    <li>Өрхийн хэрэглэгч
                      <ul className="ml-10 text-base">
                        {personal.map((product) => (
                          <DropdownItem
                            name={product[0]}
                            url={product[1]}
                            key={product[0]}
                          />
                        ))}
                        </ul>
                    </li>
                    <li>Байгууллага
                      <ul className="ml-10 text-base">
                      {corporate.map((product) => (
                        <DropdownItem
                          name={product[0]}
                          url={product[1]}
                          key={product[0]}
                        />
                      ))}
                      </ul>
                    </li>
                    <Link href="/bonus" className="hover:text-brand-2">Урамшуулал</Link>
                    <Link href="/news" className="hover:text-brand-2">Мэдээлэл</Link>
                    <Link href="/help" className="hover:text-brand-2">Тусламж.</Link>
                    <Login />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
const DropdownItem = ({ name, url }: { name: string; url: any }) => {
  return (
    <Link href={url}>
      <li className="pt-1 md:py-2 hover:translate-x-4 hover:list-disc hover:text-brand-2 transition-transform">
        {name}
      </li>
    </Link>
  );
};
export default Navbar;

"use client";

import { FaBars, FaTimes } from "react-icons/fa";
import { OverlapHover, OverlapHoverSvg } from "react-overlap";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const logoData = [
    {
      svg: "/img/Github.svg",
      href: "https://github.com/givepraise/praise",
      alt: "Github",
    },
    {
      svg: "/img/Discord.svg",
      href: "https://discord.com/invite/U2ydzXBG6C",
      alt: "Discord",
    },
    {
      svg: "/img/Twitter.svg",
      href: "https://twitter.com/givepraise",
      alt: "Twitter",
    },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`${isSticky ? "fixed left-0 top-0 z-50 w-full " : "z-50"}`}
    >
      <nav className="flex items-center px-4 py-4 mx-auto ">
        <button
          className="ml-2 text-gray-800 hover:text-pink-600 sm:hidden"
          onClick={handleMenuToggle}
        >
          <FaBars className="text-2xl" />
        </button>
        <div className="flex items-center ml-2">
          <Link href="/">
            <Image src="/img/logo.svg" alt="Praise" width={20} height={20} />
          </Link>
        </div>

        {/* Big screens menu items */}
        <div className="items-center hidden ml-2 space-x-4 sm:flex">
          <Link href="https://givepraise.xyz">
            <span className="font-bold text-gray-800 hover:text-pink-600">
              Praise
            </span>
          </Link>
          <Link href="https://docs.givepraise.xyz" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Docs</span>
          </Link>
          <Link href="https://givepraise.substack.com" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Blog</span>
          </Link>
          <Link href="https://explorer.givepraise.xyz">
            <span className="ml-2 text-gray-800 hover:text-pink-600">
              Explorer
            </span>
          </Link>
          <Link
            href="https://givepraise.xyz/waitlist"
            className="p-2 px-4 font-bold text-white rounded-full bg-themecolor-3 hover:bg-themecolor-4"
          >
            Get Praise!
          </Link>
        </div>

        {/* Small screens menu items */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } fixed inset-0 z-50 justify-center bg-white`}
          style={{ overflowY: isMenuOpen ? "auto" : "hidden" }}
        >
          <div className="absolute flex left-4 top-2">
            <div className="mt-2">
              <Link href="/" onClick={handleMenuToggle}>
                <Image src="/img/logo.svg" alt="Logo" width={20} height={20} />
              </Link>
            </div>
            <div className="mt-2.5">
              <Link href="/">
                <span className="mt-4 ml-2 font-bold text-gray-800 hover:text-pink-600">
                  Praise
                </span>
              </Link>
            </div>
          </div>
          <div className="flex h-full mt-12">
            <button
              className="absolute top-0 right-0 p-4 text-gray-800 hover:text-pink-600"
              onClick={handleMenuToggle}
            >
              <FaTimes className="w-8 h-8" />
            </button>
            <div className="flex flex-col mt-8 space-y-8 text-5xl">
              <div className="flex justify-center">
                <Link
                  href="https://docs.givepraise.xyz"
                  onClick={handleMenuToggle}
                >
                  <span className="text-gray-800 hover:text-pink-600">
                    Docs
                  </span>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  href="https://givepraise.substack.com/"
                  target="_blank"
                  onClick={handleMenuToggle}
                >
                  <span className="text-gray-800 hover:text-pink-600">
                    Blog
                  </span>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  href="https://explorer.givepraise.xyz"
                  onClick={handleMenuToggle}
                >
                  <span className="text-gray-800 hover:text-pink-600">
                    Explorer
                  </span>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  href="https://givepraise.xyz/waitlist"
                  onClick={handleMenuToggle}
                >
                  <button className="text-gray-800 hover:text-pink-600">
                    Get Praise!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            !isMenuOpen ? "flex" : "hidden"
          } invisible ml-auto lg:visible`}
        >
          <OverlapHover size={30} spacing={10} overlap={0.4} direction="left">
            {logoData.map((data, index) => (
              <OverlapHoverSvg
                key={index}
                alt={data.alt}
                href={data.href}
                className="opacity-100 hover:opacity-70" // Optional, tailwind example
                svg={data.svg}
              />
            ))}
          </OverlapHover>
        </div>
      </nav>
    </header>
  );
};

export default Menu;

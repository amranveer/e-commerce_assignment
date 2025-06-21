import { useState } from "react";
import { Link } from "react-router-dom";
import { PiShoppingBagBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import CartDrawer from "./CartDrawer"; // ✅ Make sure path is correct

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ State to control modal

  return (
    <>
      <nav className="flex items-center justify-between px-4 lg:px-10 py-3 h-[60px] w-full shadow-md bg-white">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/nav/Logo.png"
            alt="Logo"
            className="h-8 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="lg:flex hidden items-center gap-6 text-sm font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-black transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-black transition">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/product" className="hover:text-black transition">
              Product
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-black transition">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5 text-xl text-gray-700">
          <Link to="/search" className="hover:text-black transition">
            <CiSearch />
          </Link>

          {/* 🔥 Cart icon triggers modal */}
          <button onClick={() => setIsCartOpen(true)} className="hover:text-black transition">
            <PiShoppingBagBold />
          </button>

          <Link to="/account" className="hover:text-black transition">
            <RiAccountCircleLine />
          </Link>
        </div>
      </nav>

      {/* 🛒 Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

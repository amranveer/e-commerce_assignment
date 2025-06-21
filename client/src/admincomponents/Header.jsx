// src/admincomponents/Header.jsx
import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex-1 max-w-lg mr-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-lg px-10 py-2 focus:border-gray-400 transition"
          />
        </div>
      </div>
      <div className="relative flex items-center gap-3">
        <img
          src="/avatar.png"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">Moni Roy</p>
          <p className="text-xs text-gray-500 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            Admin <FiChevronDown className="inline-block" />
          </p>
        </div>
        {showDropdown && (
          <div className="absolute right-0 top-full bg-white shadow rounded mt-2 py-2 w-32">
            <button className="block w-full py-2 px-4 hover:bg-gray-100 text-left">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

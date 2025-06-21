import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FiX } from "react-icons/fi";

export default function CartDrawer({ isOpen, onClose }) {
  const drawerRef = useRef();

  const cartItems = [
    {
      id: 1,
      name: "Tray Table",
      price: 19.19,
      color: "Black",
      image: "/Left.png",
    },
    {
      id: 2,
      name: "Tray Table",
      price: 19.19,
      color: "Red",
      image: "/Left.png",
    },
    {
      id: 3,
      name: "Table lamp",
      price: 39.0,
      color: "Gold",
      image: "/Left.png",
    },
  ];

  const subtotal = 99.0;
  const total = 234.0;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300" />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-10 pb-6 ">
          <h2 className="text-3xl font-semibold">Cart</h2>
          <button onClick={onClose} className="bg-black rounded-full p-1">
            <IoClose size={24} className="text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex-shrink-0 w-[80px] flex items-start pt-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[64px] h-auto object-cover rounded"
                />
              </div>

              <div className="flex-1 py-2 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">Color: {item.color}</p>
                  </div>
                  <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                </div>

                <div className="mt-3 flex items-center border border-gray-300 w-fit rounded px-2 py-1 text-sm gap-2">
                  <button className="text-gray-500">−</button>
                  <span className="font-medium">2</span>
                  <button className="text-gray-500">+</button>
                </div>
              </div>

              <button className="self-start pt-2 text-gray-500 hover:text-black">
                <FiX />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="sticky bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-6  space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-900 transition">
            Checkout
          </button>
          <button className="w-full mt-2 text-sm underline hover:text-black text-center">
            View Cart
          </button>
        </div>
      </div>
    </>
  );
}

import { NavLink } from "react-router-dom";
import { MdDashboard, MdFavoriteBorder, MdInbox, MdList, MdLogout } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { PiCubeFocusDuotone } from "react-icons/pi";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg font-medium hover:bg-black/10 transition ${
      isActive ? "bg-black text-white" : "text-gray-800"
    }`;

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">3legant.</h1>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <MdDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          <FaBoxOpen size={20} /> Products
        </NavLink>
        <NavLink to="/admin/favorites" className={linkClass}>
          <MdFavoriteBorder size={20} /> Favorites
        </NavLink>
        <NavLink to="/admin/inbox" className={linkClass}>
          <MdInbox size={20} /> Inbox
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          <MdList size={20} /> Order Lists
        </NavLink>
        <NavLink to="/admin/stock" className={linkClass}>
          <PiCubeFocusDuotone size={20} /> Product Stock
        </NavLink>
      </nav>

      <div className="mt-auto border-t pt-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-black">
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

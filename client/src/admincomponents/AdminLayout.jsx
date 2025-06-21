// src/components/admin/AdminLayout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

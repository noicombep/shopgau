import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 font-bold text-xl border-b">
        🧸 Bear Admin
      </div>
      <nav className="p-4 space-y-3">
        <Link
          to="/admin/dashboard"
          className={`block px-3 py-2 rounded hover:text-pink-500 ${
            isActive("/admin/dashboard") ? "bg-pink-100 text-pink-600" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`block px-3 py-2 rounded hover:text-pink-500 ${
            isActive("/admin/products") ? "bg-pink-100 text-pink-600" : ""
          }`}
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className={`block px-3 py-2 rounded hover:text-pink-500 ${
            isActive("/admin/orders") ? "bg-pink-100 text-pink-600" : ""
          }`}
        >
          Orders
        </Link>
        <Link
          to="/admin/users"
          className={`block px-3 py-2 rounded hover:text-pink-500 ${
            isActive("/admin/users") ? "bg-pink-100 text-pink-600" : ""
          }`}
        >
          Users
        </Link>
        <Link
          to="/admin/categories"
          className={`block px-3 py-2 rounded hover:text-pink-500 ${
            isActive("/admin/categories") ? "bg-pink-100 text-pink-600" : ""
          }`}
        >
          Categories
        </Link>
      </nav>
    </div>
  );
}
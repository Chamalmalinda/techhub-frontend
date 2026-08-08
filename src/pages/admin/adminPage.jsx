import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaRectangleList, FaUserGroup } from "react-icons/fa6";
import { LuBoxes, LuLogOut } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import { AdminProductspage } from "./adminProductspage";
import AdminAddProductPage from "./adminAddProductPage";
import AdminUpdateProductPage from "./adminUpdateProductPage";
import { AdminOrdersPage } from "./adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminUsersPage from "./adminUsersPage";
import AdminReviewsPage from "./adminReviewsPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      window.location.href = "/";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.role === "admin") {
          setUser(response.data);
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <div className="flex h-full max-h-full w-full bg-accent">
      <div className="flex h-full w-[300px] flex-col bg-accent">
        <div className="flex h-[100px] w-full items-center text-primary">
          <img
            src="/logo.png"
            alt="Tech Hub logo"
            className="ml-5 mt-3 inline-flex h-[60%] shrink-0 items-center rounded-xl bg-white px-3 py-2 shadow-md shadow-black/30"
          />

          <div className="ml-7">
            <h1 className="text-2xl">Admin</h1>

            {user && (
              <p className="mt-1 max-w-[150px] truncate text-sm text-white/70">
                {user.firstName || user.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between pb-8">
          <nav className="flex w-full flex-col pl-5 pt-5 text-2xl text-white">
            <Link
              to="/admin"
              className="flex h-[50px] w-full items-center gap-[10px] transition hover:translate-x-1 hover:text-primary"
            >
              <FaRectangleList />
              Orders
            </Link>

            <Link
              to="/admin/products"
              className="flex h-[50px] w-full items-center gap-[10px] transition hover:translate-x-1 hover:text-primary"
            >
              <LuBoxes />
              Products
            </Link>

            <Link
              to="/admin/users"
              className="flex h-[50px] w-full items-center gap-[10px] transition hover:translate-x-1 hover:text-primary"
            >
              <FaUserGroup />
              Users
            </Link>

            <Link
              to="/admin/reviews"
              className="flex h-[50px] w-full items-center gap-[10px] transition hover:translate-x-1 hover:text-primary"
            >
              <MdOutlineRateReview />
              Reviews
            </Link>
          </nav>

          <div className="px-5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-[50px] w-full items-center gap-3 rounded-lg px-4 text-left text-xl font-medium text-white transition hover:bg-red-600"
            >
              <LuLogOut className="text-2xl" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="h-full max-h-full w-[calc(100%-300px)] overflow-y-scroll rounded-3xl border-[10px] border-accent bg-primary">
        <Routes>
          <Route path="/" element={<AdminOrdersPage />} />

          <Route
            path="/products"
            element={<AdminProductspage />}
          />

          <Route
            path="/add-product"
            element={<AdminAddProductPage />}
          />

          <Route
            path="/update-product"
            element={<AdminUpdateProductPage />}
          />

          <Route
            path="/users"
            element={<AdminUsersPage />}
          />

          <Route
            path="/reviews"
            element={<AdminReviewsPage />}
          />
        </Routes>
      </div>
    </div>
  );
}
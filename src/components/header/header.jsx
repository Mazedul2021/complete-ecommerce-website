import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { IoShieldCheckmarkOutline, IoSparkles, IoFlame } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { useStore } from "../../context/StoreContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 10,
    backgroundColor: "#e11d48",
    color: "#fff",
    fontWeight: "700",
    fontSize: "11px",
    padding: "0 4px",
    boxShadow: "0 2px 6px rgba(225, 29, 72, 0.4)",
  },
}));

const ANNOUNCEMENTS = [
  { icon: <IoFlame className="text-amber-300 text-[14px]" />, text: "Limited Time: Extra 10% OFF with code OLEVS10" },
  { icon: <IoSparkles className="text-amber-300 text-[14px]" />, text: "100% Authentic Timepieces with 1-Year Official Warranty" },
  { icon: <IoShieldCheckmarkOutline className="text-amber-300 text-[14px]" />, text: "Free Express Delivery across Bangladesh on orders over ৳2,000" },
];

const Header = () => {
  const { cartCount, wishlist, setCartDrawerOpen, setMobileNavOpen } = useStore();
  const [isSticky, setIsSticky] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={`z-[150] transition-all duration-300 ${
        isSticky
          ? "sticky top-0 bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_rgba(15,23,42,0.08)] border-b border-slate-100"
          : "relative bg-white"
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-2 border-b border-slate-800 text-[12.5px]">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1.5 font-medium animate-in fade-in duration-500 key={announcementIdx}">
              {ANNOUNCEMENTS[announcementIdx].icon}
              <span className="text-slate-200">{ANNOUNCEMENTS[announcementIdx].text}</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-slate-300">
            <Link
              to="/order-tracking"
              className="hover:text-rose-400 transition font-medium"
            >
              Order Tracking
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              to="/help-center"
              className="hover:text-rose-400 transition font-medium"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="py-3 sm:py-3.5">
        <div className="container flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-[20px] transition"
              aria-label="Open menu"
            >
              <RiMenu2Fill />
            </button>

            <Link to="/" className="group flex items-center gap-2">
              <img
                className="w-[125px] sm:w-[145px] h-auto transition-transform duration-300 group-hover:scale-105"
                src="/logo.webp"
                alt="OLEVS Watch Shop"
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="w-[45%] max-w-[560px] hidden md:block">
            <Search />
          </div>

          {/* User Nav & Cart / Wishlist Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[13.5px] font-semibold text-slate-700 pr-2">
              <Link
                to="/login"
                className="hover:text-rose-600 transition px-2.5 py-1 rounded-lg hover:bg-slate-50"
              >
                Sign In
              </Link>
              <span className="text-slate-300">/</span>
              <Link
                to="/register"
                className="hover:text-rose-600 transition px-2.5 py-1 rounded-lg hover:bg-slate-50"
              >
                Register
              </Link>
            </div>

            {/* Wishlist Icon */}
            <Tooltip title="View Wishlist">
              <Link to="/wishlist">
                <IconButton
                  aria-label="wishlist"
                  className="!w-10 !h-10 !rounded-xl !bg-slate-50 hover:!bg-rose-50 hover:!text-rose-600 !transition"
                >
                  <StyledBadge badgeContent={wishlist.length}>
                    <FaRegHeart className="text-[18px] text-slate-700 hover:text-rose-600" />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Tooltip>

            {/* Cart Drawer Trigger */}
            <Tooltip title="Shopping Bag">
              <IconButton
                aria-label="cart"
                onClick={() => setCartDrawerOpen(true)}
                className="!w-10 !h-10 !rounded-xl !bg-slate-50 hover:!bg-rose-50 hover:!text-rose-600 !transition"
              >
                <StyledBadge badgeContent={cartCount}>
                  <MdOutlineShoppingCart className="text-[20px] text-slate-700 hover:text-rose-600" />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="container mt-2.5 md:hidden">
          <Search />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="hidden lg:block">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;

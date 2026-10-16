import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { useStore } from "../../context/StoreContext";

const StyledBadge =
  styled(Badge)(
    ({ theme }) => ({
      "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: "0 4px",
      },
    })
  );

const Header = () => {
  const { cartCount, wishlist, setCartDrawerOpen, setMobileNavOpen } =
    useStore();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`bg-white shadow-md z-[150] ${
        isSticky ? "sticky top-0" : "relative"
      }`}
    >
      <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-300 bg-[#ff5252] text-white">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1">
              <p className="text-[13px] font-[500]">
                ⚡ Get up to 50% off — Limited time only
              </p>
            </div>
            <div className="col-2 flex items-center justify-end">
              <ul className="hidden sm:flex items-center gap-4">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[13px] font-[500] hover:underline"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[13px] font-[500] hover:underline"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-3 border-b-[1px] border-gray-200">
        <div className="container flex items-center justify-between gap-4">
          <div className="col1 flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden text-[22px] p-1"
              aria-label="Open menu"
            >
              <RiMenu2Fill />
            </button>
            <Link to={"/"}>
              <img className="w-[140px] h-auto" src="/logo.webp" alt="Olevs Watch Shop" />
            </Link>
          </div>

          <div className="col2 w-[45%] hidden md:block">
            <Search />
          </div>

          <div className="col3 flex items-center pl-0 lg:pl-7">
            <ul className="flex items-center justify-end gap-1 sm:gap-3 w-full">
              <li className="list-none hidden lg:block">
                <Link
                  to="/login"
                  className="link transition text-[15px] font-[500]"
                >
                  Login
                </Link>{" "}
                | &nbsp;
                <Link
                  to="/register"
                  className="link transition text-[15px] font-[500]"
                >
                  Register
                </Link>
              </li>

              <li>
                <Tooltip title="Wishlist">
                  <Link to="/wishlist">
                    <IconButton aria-label="wishlist">
                      <StyledBadge badgeContent={wishlist.length} color="secondary">
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => setCartDrawerOpen(true)}
                  >
                    <StyledBadge badgeContent={cartCount} color="secondary">
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="container mt-3 md:hidden">
          <Search />
        </div>
      </div>

      <div className="hidden lg:block">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;

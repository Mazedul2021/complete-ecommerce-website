import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import { categories } from "../../data/categories";
import { useStore } from "../../context/StoreContext";

const MobileNav = () => {
  const { mobileNavOpen, setMobileNavOpen } = useStore();
  const [openCat, setOpenCat] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const navigate = useNavigate();

  const go = (to) => {
    setMobileNavOpen(false);
    navigate(to);
  };

  const linkRow = (to, label) => (
    <button
      key={label}
      onClick={() => go(to)}
      className="w-full text-left px-4 py-2.5 text-[14px] text-[rgba(0,0,0,0.7)] hover:text-[#ff5252] border-b border-[rgba(0,0,0,0.05)]"
    >
      {label}
    </button>
  );

  return (
    <Drawer
      anchor="left"
      open={mobileNavOpen}
      onClose={() => setMobileNavOpen(false)}
    >
      <div className="w-[300px] max-w-[85vw]">
        <div className="bg-[#ff5252] text-white px-4 py-4 flex items-center justify-between">
          <span className="font-[600] text-[16px]">Browse Categories</span>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="text-white text-[22px] leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
          {linkRow("/", "🏠 Home")}
          {linkRow("/shop", "🛍️ All Products")}

          {categories.map((cat) => (
            <div key={cat.id} className="border-b border-[rgba(0,0,0,0.05)]">
              <button
                onClick={() =>
                  setOpenCat(openCat === cat.id ? null : cat.id)
                }
                className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-[500] text-[rgba(0,0,0,0.8)]"
              >
                <img
                  src={cat.img}
                  alt=""
                  className="w-[24px] h-[24px] object-contain"
                />
                {cat.name}
                <span className="ml-auto">
                  {openCat === cat.id ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </button>

              <Collapse in={openCat === cat.id} timeout="auto">
                <div className="bg-[#fafafa]">
                  <button
                    onClick={() => go(`/shop?category=${cat.slug}`)}
                    className="w-full text-left px-10 py-2 text-[13px] font-[600] text-[#ff5252]"
                  >
                    View all {cat.name}
                  </button>
                  {cat.subCategories.map((sub) => (
                    <div key={sub.slug}>
                      <button
                        onClick={() =>
                          setOpenSub(openSub === sub.slug ? null : sub.slug)
                        }
                        className="w-full flex items-center justify-between px-10 py-2 text-[13px] text-[rgba(0,0,0,0.7)]"
                      >
                        {sub.name}
                        {sub.children?.length > 0 && (
                          <span className="text-[11px] text-[rgba(0,0,0,0.4)]">
                            {openSub === sub.slug ? "▲" : "▼"}
                          </span>
                        )}
                      </button>
                      <Collapse in={openSub === sub.slug} timeout="auto">
                        <div>
                          {sub.children?.map((child) => (
                            <button
                              key={child}
                              onClick={() =>
                                go(`/shop?category=${cat.slug}`)
                              }
                              className="w-full text-left px-14 py-1.5 text-[12.5px] text-[rgba(0,0,0,0.55)] hover:text-[#ff5252]"
                            >
                              — {child}
                            </button>
                          ))}
                        </div>
                      </Collapse>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}

          {linkRow("/about", "ℹ️ About Us")}
          {linkRow("/contact", "📞 Contact")}
          {linkRow("/order-tracking", "🚚 Order Tracking")}
          {linkRow("/help-center", "❓ Help Center")}
        </div>

        <div className="p-4 border-t">
          <Link to="/login" onClick={() => setMobileNavOpen(false)}>
            <Button className="btn-org w-full !normal-case">Login / Register</Button>
          </Link>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileNav;

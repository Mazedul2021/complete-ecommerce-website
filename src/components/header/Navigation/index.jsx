import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import CategoryPanel from "./CategoryPanel";
import { categories } from "../../../data/categories";
import bannerImg from "../../../assets/Image/Banner/9.webp";
import "./style.css";

const MegaCol = ({ title, to, links }) => (
  <div className="megaCol">
    <Link to={to} className="!text-[14px] !font-[600] !text-black !pb-1">
      {title}
    </Link>
    <ul className="mt-1">
      {links.map((l) => (
        <li key={l}>
          <Link to={to}>{l}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Navigation = () => {
  const featuredCats = categories.slice(0, 4);

  return (
    <nav className="nav py-1.5 bg-white border-b border-[rgba(0,0,0,0.08)]">
      <div className="container flex items-center justify-between">
        <div className="col-1 w-[25%] hidden lg:block">
          <CategoryPanel />
        </div>

        <div className="col-2 w-full lg:w-[75%]">
          <ul className="flex items-center gap-1 nav justify-start lg:justify-end">
            <li className="list-none">
              <Link to="/">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !normal-case">
                  <span className="navLabel text-[14px]">Home</span>
                </Button>
              </Link>
            </li>

            <li className="list-none relative">
              <Link to="/shop">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !normal-case">
                  <span className="navLabel text-[14px]">Shop</span>
                </Button>
              </Link>

              {/* Shop mega menu: all categories */}
              <div className="megaMenu absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-lg border border-[rgba(0,0,0,0.06)] p-6">
                <div className="grid grid-cols-4 gap-x-8 gap-y-5">
                  {categories.map((cat) => (
                    <div key={cat.id}>
                      <Link
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center gap-2 !text-[13.5px] !font-[600] !text-black !pb-1 hover:!text-[#ff5252]"
                      >
                        <img
                          src={cat.img}
                          alt=""
                          className="w-[22px] h-[22px] object-contain"
                        />
                        {cat.name}
                      </Link>
                      <ul className="mt-1">
                        {cat.subCategories
                          .slice(0, 3)
                          .map((sub) => (
                            <li key={sub.slug}>
                              <Link to={`/shop?category=${cat.slug}`}>
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {featuredCats.map((cat) => (
              <li key={cat.id} className="list-none relative">
                <Link to={`/shop?category=${cat.slug}`}>
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !normal-case">
                    <span className="navLabel text-[14px]">{cat.name}</span>
                  </Button>
                </Link>

                {/* Category flyout */}
                <div className="megaMenu absolute top-full left-0 w-[460px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-lg border border-[rgba(0,0,0,0.06)] p-5">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {cat.subCategories.map((sub) => (
                      <MegaCol
                        key={sub.slug}
                        title={sub.name}
                        to={`/shop?category=${cat.slug}`}
                        links={sub.children ?? []}
                      />
                    ))}
                  </div>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="mt-4 block overflow-hidden rounded-md relative group/promo"
                  >
                    <img
                      src={bannerImg}
                      alt={`${cat.name} offer`}
                      className="w-full h-[110px] object-cover group-hover/promo:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span className="text-white text-[14px] font-[600] tracking-wide">
                        Explore {cat.name} →
                      </span>
                    </div>
                  </Link>
                </div>
              </li>
            ))}

            <li className="list-none">
              <Link to="/about">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !normal-case">
                  <span className="navLabel text-[14px]">About</span>
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/contact">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !normal-case">
                  <span className="navLabel text-[14px]">Contact</span>
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/shop?sort=discount">
                <Button className="!font-[600] !text-[#ff5252] !normal-case relative">
                  <span className="text-[14px]">Hot Sale</span>
                  <span className="absolute -top-1 -right-4 bg-[#ff5252] text-white text-[9px] px-1.5 py-[1px] rounded-full">
                    50%
                  </span>
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

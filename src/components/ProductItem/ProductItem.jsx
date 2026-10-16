import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const ProductItem = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const disc = discountPercent(product.price, product.oldPrice);
  const inWishlist = isInWishlist(product.id);
  const img = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div className="productItem shadow-sm hover:shadow-xl rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white transition-shadow duration-300 h-full flex flex-col">
      <div
        className="group imgWrapper w-[100%] overflow-hidden rounded-t-md relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`}>
          <div className="img h-[220px] overflow-hidden bg-[#f7f7f7]">
            <img
              src={img}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-[1.08] transition-all duration-500"
            />
          </div>
        </Link>
        {disc > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 px-2 text-[12px] font-[500]">
            {disc}%
          </span>
        )}
        {product.latest && (
          <span className="absolute top-[10px] left-[60px] z-50 bg-black text-white rounded-lg py-1 px-2 text-[11px] font-[500]">
            NEW
          </span>
        )}
        <div className="action flex items-center top-[-200px] right-[5px] z-50 flex-col w-[50px] absolute gap-2 group-hover:top-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Tooltip title="View details">
            <Link to={`/product/${product.id}`}>
              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group">
                <MdOutlineZoomOutMap className="!text-[18px]" />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}>
            <Button
              onClick={() => toggleWishlist(product)}
              className={`!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group ${
                inWishlist ? "!text-[#ff5252]" : ""
              }`}
            >
              {inWishlist ? (
                <FaHeart className="!text-[16px]" />
              ) : (
                <FaRegHeart className="!text-[18px]" />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="info p-3 flex flex-col flex-1">
        <h6 className="text-[11px] !font-[600] uppercase text-[#ff5252] tracking-wide">
          {product.brand}
        </h6>
        <h3 className="text-[12px] lg:text-[13px] title mt-1 font-[500] text-[#000] line-clamp-2 min-h-[36px]">
          <Link to={`/product/${product.id}`} className="link">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Rating
            name="rating"
            value={product.rating}
            size="small"
            precision={0.1}
            readOnly
          />
          <span className="text-[11px] text-[rgba(0,0,0,0.45)]">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-2 justify-between mt-auto pt-2">
          <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[13px] font-[500]">
            {formatPrice(product.oldPrice)}
          </span>
          <span className="price text-primary text-[13px] lg:text-[15px] font-[700]">
            {formatPrice(product.price)}
          </span>
        </div>
        <Button
          onClick={() => addToCart(product)}
          className="!mt-2 !normal-case gap-2 !text-[13px] !border !border-[rgba(0,0,0,0.15)] !text-black hover:!bg-primary hover:!text-white hover:!border-primary transition-all"
        >
          <IoCartOutline className="text-[17px]" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;

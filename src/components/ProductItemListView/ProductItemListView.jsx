import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./style.css";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const ProductItemListView = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const disc = discountPercent(product.price, product.oldPrice);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="productItem p-4 shadow-sm hover:shadow-lg transition-all duration-200 rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)] bg-white flex items-center flex-col lg:flex-row">
      <div className="group imgWrapper w-full lg:w-[22%] overflow-hidden rounded-md relative">
        <Link to={`/product/${product.id}`}>
          <div className="img h-[220px] overflow-hidden bg-[#f7f7f7]">
            <img
              src={product.images[0]}
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

      <div className="info p-3 lg:px-6 py-3 w-full lg:w-[78%]">
        <h6 className="text-[11px] !font-[600] uppercase text-[#ff5252] tracking-wide">
          {product.brand}
        </h6>
        <h3 className="text-[14px] lg:text-[18px] title mt-1 mb-2 font-[500] text-[#000]">
          <Link to={`/product/${product.id}`} className="link">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Rating
            value={product.rating}
            size="small"
            precision={0.1}
            readOnly
          />
          <span className="text-[12px] text-[rgba(0,0,0,0.45)]">
            ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-[13.5px] mb-3 text-[rgba(0,0,0,0.6)] line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          {[
            ["Strap", product.strap],
            ["Movement", product.movement],
            ["Water Resist", product.waterResist],
          ].map(([k, v]) => (
            <span
              key={k}
              className="text-[11.5px] bg-[#f5f5f5] rounded px-2 py-0.5 text-[rgba(0,0,0,0.6)]"
            >
              {k}: <b className="font-[600]">{v}</b>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[13px] font-[500]">
            {formatPrice(product.oldPrice)}
          </span>
          <span className="price text-primary text-[15px] lg:text-[18px] font-[700]">
            {formatPrice(product.price)}
          </span>
          {product.stock > 0 ? (
            <span className="text-[12px] text-green-600 font-[500]">
              ● In Stock ({product.stock})
            </span>
          ) : (
            <span className="text-[12px] text-red-500 font-[500]">
              ● Out of Stock
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={() => toggleWishlist(product)}
              className="!normal-case gap-2 !text-[13px] !border !border-[rgba(0,0,0,0.15)] !text-black hover:!border-primary"
            >
              {inWishlist ? <FaHeart className="text-[#ff5252]" /> : <FaRegHeart />}
              {inWishlist ? "Wishlisted" : "Wishlist"}
            </Button>
            <Button
              onClick={() => addToCart(product)}
              className="btn-org gap-2 !normal-case !text-[13px]"
            >
              <FaCartPlus className="text-[16px]" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;

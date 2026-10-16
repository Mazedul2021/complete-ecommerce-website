import React, { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import { FaRegHeart, FaHeart, FaCartPlus, FaShareAlt } from "react-icons/fa";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import QuantityBox from "../../components/QuantityBox/QuantityBox";
import { getProductById, getRelatedProducts } from "../../data/products";
import { getCategoryName } from "../../data/categories";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const Reviews = ({ rating, count }) => {
  const reviewList = [
    {
      name: "Rakib H.",
      date: "2 weeks ago",
      rating: 5,
      text: "Excellent quality for the price. Packaging was premium and delivery took only 2 days. Highly recommended!",
    },
    {
      name: "Mim A.",
      date: "1 month ago",
      rating: 4,
      text: "Beautiful watch, looks exactly like the photos. The strap is comfortable. Only wish it had a sapphire glass.",
    },
    {
      name: "Shakib M.",
      date: "2 months ago",
      rating: 5,
      text: "Authentic product with warranty card included. Customer support answered all my questions quickly.",
    },
  ];

  return (
    <div className="py-6">
      <div className="flex items-center gap-3 mb-5">
        <Rating value={rating} precision={0.1} readOnly />
        <span className="text-[14px] font-[600]">
          {rating.toFixed(1)} out of 5
        </span>
        <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
          ({count} customer reviews)
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviewList.map((r) => (
          <div
            key={r.name}
            className="bg-[#fafafa] rounded-lg p-4 border border-[rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-[600] text-[14px]">{r.name}</span>
              <span className="text-[12px] text-[rgba(0,0,0,0.4)]">
                {r.date}
              </span>
            </div>
            <Rating value={r.rating} size="small" readOnly className="!mt-1" />
            <p className="text-[13.5px] text-[rgba(0,0,0,0.7)] mt-2">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [tab, setTab] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const related = useMemo(
    () => (product ? getRelatedProducts(product) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-[24px] font-[700]">Product not found</h2>
        <p className="text-[rgba(0,0,0,0.5)] mt-2">
          The product you're looking for doesn't exist.
        </p>
        <Link to="/shop">
          <Button className="btn-org !mt-5 !normal-case">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const disc = discountPercent(product.price, product.oldPrice);
  const inWishlist = isInWishlist(product.id);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <BreedCrumps
        items={[
          { label: "Shop", to: "/shop" },
          {
            label: getCategoryName(product.category),
            to: `/shop?category=${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <section className="py-8 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-[80px] shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-[80px] rounded-md overflow-hidden border-2 transition ${
                      activeImg === i
                        ? "border-[#ff5252]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover bg-[#f7f7f7]"
                    />
                  </button>
                ))}
              </div>
              <div
                className="flex-1 relative rounded-lg overflow-hidden bg-[#f7f7f7] h-[420px] lg:h-[480px] cursor-crosshair"
                onMouseMove={onMouseMove}
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-200"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                {disc > 0 && (
                  <span className="absolute top-4 left-4 bg-[#ff5252] text-white rounded-lg px-2.5 py-1 text-[13px] font-[600]">
                    -{disc}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <Link
                to={`/shop?brand=${product.brand}`}
                className="text-[13px] font-[700] uppercase text-[#ff5252] tracking-wide"
              >
                {product.brand}
              </Link>
              <h1 className="text-[22px] lg:text-[28px] font-[700] mt-1.5 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <Rating value={product.rating} precision={0.1} readOnly />
                <span className="text-[13px] font-[600]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
                  ({product.reviews} reviews)
                </span>
                <span className="text-[rgba(0,0,0,0.2)]">|</span>
                <span className="text-[13px] font-[500] text-green-600">
                  ● {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-[30px] font-[700] text-[#ff5252]">
                  {formatPrice(product.price)}
                </span>
                {disc > 0 && (
                  <>
                    <span className="text-[17px] line-through text-[rgba(0,0,0,0.4)]">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="bg-[#fff5f5] text-[#ff5252] text-[12px] font-[600] px-2 py-1 rounded">
                      You save {formatPrice(product.oldPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-[14.5px] text-[rgba(0,0,0,0.65)] leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Color options */}
              <div className="mt-5">
                <p className="text-[13px] font-[600] mb-2">
                  Color: <span className="font-[400] text-[rgba(0,0,0,0.6)]">{color}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-3 py-1.5 rounded-md text-[13px] border transition ${
                        color === c
                          ? "border-[#ff5252] bg-[#fff5f5] text-[#ff5252] font-[600]"
                          : "border-[rgba(0,0,0,0.15)] hover:border-[rgba(0,0,0,0.4)]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <QuantityBox value={qty} onChange={setQty} max={product.stock || 99} />
                <Button
                  onClick={() => addToCart(product, qty)}
                  className="btn-org gap-2 !normal-case !py-2.5 !px-7"
                  startIcon={<FaCartPlus />}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    addToCart(product, qty);
                    navigate("/checkout");
                  }}
                  variant="outlined"
                  className="!normal-case !py-2.5 !px-7 !border-black !text-black hover:!border-[#ff5252] hover:!text-[#ff5252]"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => toggleWishlist(product)}
                  className="!w-[46px] !h-[46px] !min-w-[46px] !rounded-full !border !border-[rgba(0,0,0,0.2)] !p-0"
                >
                  {inWishlist ? (
                    <FaHeart className="text-[#ff5252] text-[17px]" />
                  ) : (
                    <FaRegHeart className="text-[17px]" />
                  )}
                </Button>
              </div>

              {/* Meta */}
              <div className="mt-6 bg-[#fafafa] rounded-lg p-4 text-[13.5px] space-y-1.5">
                <p>
                  <b>SKU:</b>{" "}
                  <span className="text-[rgba(0,0,0,0.6)]">{product.sku}</span>
                </p>
                <p>
                  <b>Category:</b>{" "}
                  <Link
                    to={`/shop?category=${product.category}`}
                    className="link text-[#ff5252]"
                  >
                    {getCategoryName(product.category)}
                  </Link>
                </p>
                <p>
                  <b>Tags:</b>{" "}
                  <span className="text-[rgba(0,0,0,0.6)]">
                    {product.tags.join(", ")}
                  </span>
                </p>
                <p>
                  <b>Share:</b>{" "}
                  <FaShareAlt className="inline text-[rgba(0,0,0,0.5)]" />
                </p>
              </div>

              {/* Delivery perks */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  ["🚚", "Free shipping", "On orders over ৳2,000"],
                  ["🔄", "7-day return", "Easy & hassle free"],
                  ["✅", "1 year warranty", "Official guarantee"],
                ].map(([icon, t, s]) => (
                  <div
                    key={t}
                    className="border border-[rgba(0,0,0,0.08)] rounded-lg p-3 text-center"
                  >
                    <span className="text-[20px]">{icon}</span>
                    <p className="text-[12.5px] font-[600] mt-1">{t}</p>
                    <p className="text-[11px] text-[rgba(0,0,0,0.45)]">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12 border-t border-[rgba(0,0,0,0.08)] pt-2">
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Description" className="!normal-case" />
              <Tab label="Additional Information" className="!normal-case" />
              <Tab label={`Reviews (${product.reviews})`} className="!normal-case" />
            </Tabs>

            <div className="py-6 max-w-[900px]">
              {tab === 0 && (
                <div className="text-[14.5px] text-[rgba(0,0,0,0.7)] leading-relaxed space-y-3">
                  <p>{product.description}</p>
                  <p>
                    Every {product.brand} timepiece sold at Olevs Watch Shop is
                    100% authentic and comes with an official warranty card.
                    Your watch arrives in premium packaging, quality-checked by
                    our team before dispatch.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Precise {product.movement.toLowerCase()} movement</li>
                    <li>Comfortable {product.strap.toLowerCase()} strap</li>
                    <li>{product.waterResist} water resistance</li>
                    <li>Scratch-resistant hardened mineral glass</li>
                  </ul>
                </div>
              )}
              {tab === 1 && (
                <table className="w-full max-w-[600px] text-[14px]">
                  <tbody>
                    {[
                      ["Brand", product.brand],
                      ["Model", product.sku],
                      ["Movement", product.movement],
                      ["Strap Material", product.strap],
                      ["Water Resistance", product.waterResist],
                      ["Available Colors", product.colors.join(", ")],
                      ["Warranty", "1 Year Official Warranty"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-[rgba(0,0,0,0.07)]">
                        <td className="py-2.5 font-[600] w-[200px]">{k}</td>
                        <td className="py-2.5 text-[rgba(0,0,0,0.65)]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === 2 && <Reviews rating={product.rating} count={product.reviews} />}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="text-[22px] font-[700] titleUnderline mb-2">
                You May Also Like
              </h2>
              <ProductsSlider products={related} items={5} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

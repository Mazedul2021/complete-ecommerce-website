import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import { FaRegHeart, FaHeart, FaCartPlus, FaShareAlt, FaCheck } from "react-icons/fa";
import { TbTruckDelivery, TbShieldCheck, TbRotateClockwise2, TbDiamond } from "react-icons/tb";
import { IoSparkles, IoFlame, IoCheckmarkCircle } from "react-icons/io5";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import QuantityBox from "../../components/QuantityBox/QuantityBox";
import { getProductById, getRelatedProducts } from "../../data/products";
import { getCategoryName } from "../../data/categories";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const ReviewsSection = ({ rating, count }) => {
  const [reviewList, setReviewList] = useState([
    {
      name: "Rakib H.",
      date: "2 weeks ago",
      rating: 5,
      text: "Excellent quality for the price. Packaging was ultra-premium with the warranty card and manual. The skeleton dial looks gorgeous in natural sunlight.",
    },
    {
      name: "Mim A.",
      date: "1 month ago",
      rating: 4,
      text: "Beautiful watch, looks exactly like the high-res photos. The strap is super comfortable and fits nicely.",
    },
    {
      name: "Shakib M.",
      date: "2 months ago",
      rating: 5,
      text: "Authentic product with official warranty. Customer support on WhatsApp answered all questions quickly before dispatch. 10/10 service.",
    },
  ]);

  const [author, setAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    setReviewList([
      {
        name: author.trim(),
        date: "Just now",
        rating: newRating,
        text: comment.trim(),
      },
      ...reviewList,
    ]);
    setAuthor("");
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center text-[22px] font-extrabold">
            {rating.toFixed(1)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Rating value={rating} precision={0.1} readOnly size="small" />
              <span className="text-[14px] font-bold text-slate-800">
                {rating.toFixed(1)} out of 5
              </span>
            </div>
            <p className="text-[12.5px] text-slate-500 mt-0.5">
              Based on {count} verified customer ratings
            </p>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="mb-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-[15px] font-bold text-slate-900 mb-2">
          Write a Review
        </h4>
        {submitted && (
          <div className="p-3 mb-3 rounded-xl bg-emerald-50 text-emerald-700 text-[13px] font-semibold flex items-center gap-2">
            <IoCheckmarkCircle className="text-[18px]" /> Thank you! Your review has been added.
          </div>
        )}
        <form onSubmit={handleAddReview} className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-slate-700">Your Rating:</span>
            <Rating
              value={newRating}
              onChange={(_, v) => setNewRating(v || 5)}
              size="medium"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name (e.g. Tanvir H.)"
              className="h-10 px-3.5 rounded-xl border border-slate-200 text-[13px] outline-none focus:border-rose-500"
              required
            />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about the craftsmanship, movement, and fit..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 text-[13px] outline-none focus:border-rose-500"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[13px] transition"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviewList.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.03)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[14px] text-slate-900 flex items-center gap-1.5">
                {r.name}
                <IoCheckmarkCircle className="text-emerald-500 text-[14px]" />
              </span>
              <span className="text-[11.5px] text-slate-400 font-medium">
                {r.date}
              </span>
            </div>
            <Rating value={r.rating} size="small" readOnly className="!mt-1.5" />
            <p className="text-[13.5px] text-slate-600 mt-2.5 leading-relaxed">
              "{r.text}"
            </p>
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

  const { addToCart, toggleWishlist, isInWishlist, showToast, recordViewedProduct } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [tab, setTab] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      recordViewedProduct(product);
      setColor(product.colors?.[0] || "");
      setActiveImg(0);
      setQty(1);
    }
  }, [product, recordViewedProduct]);

  const related = useMemo(
    () => (product ? getRelatedProducts(product) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-[26px] font-bold text-slate-900">Watch Not Found</h2>
        <p className="text-slate-500 mt-2">
          The requested timepiece model is not available or has been discontinued.
        </p>
        <Link to="/shop">
          <Button className="btn-org !mt-6 !normal-case">
            Browse All Watches
          </Button>
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: "success",
        title: "Link Copied!",
        message: "Product URL copied to clipboard.",
      });
    }
  };

  return (
    <>
      <BreedCrumps
        items={[
          { label: "Home", to: "/" },
          { label: "Catalog", to: "/shop" },
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
            {/* Gallery Column */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails row/column */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:w-[84px] shrink-0 pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 sm:w-full sm:h-[84px] rounded-xl overflow-hidden bg-slate-50 border-2 transition-all p-1.5 shrink-0 ${
                      activeImg === i
                        ? "border-rose-600 shadow-md shadow-rose-600/20 scale-102"
                        : "border-slate-200/80 hover:border-slate-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom Lens */}
              <div
                className="flex-1 relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border border-slate-200/80 h-[380px] sm:h-[480px] cursor-crosshair flex items-center justify-center p-6 shadow-sm"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={onMouseMove}
              >
                <img
                  src={product.images[activeImg] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-150 ease-out"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZoomed ? "scale(2.2)" : "scale(1)",
                  }}
                />

                {disc > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full px-3 py-1 text-[12px] font-extrabold shadow-md shadow-rose-600/30 flex items-center gap-1">
                    <IoFlame /> SAVE {disc}%
                  </span>
                )}

                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11.5px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <IoSparkles className="text-amber-400" />
                  <span>Hover to Zoom Details</span>
                </div>
              </div>
            </div>

            {/* Product Details Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/shop?brand=${product.brand}`}
                    className="text-[12px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-md"
                  >
                    {product.brand}
                  </Link>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
                  >
                    <FaShareAlt className="text-[12px]" /> Share
                  </button>
                </div>

                <h1 className="text-[24px] lg:text-[30px] font-extrabold text-slate-900 mt-3 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <span className="text-[13.5px] font-bold text-slate-800">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-[12.5px] text-slate-400">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-[13px] font-bold text-emerald-600 flex items-center gap-1">
                    <IoCheckmarkCircle /> {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[12px] font-mono text-slate-400">
                    SKU: {product.sku}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3.5 mt-5">
                  <span className="text-[32px] font-extrabold text-rose-600">
                    {formatPrice(product.price)}
                  </span>
                  {disc > 0 && (
                    <>
                      <span className="text-[18px] line-through text-slate-400 font-medium">
                        {formatPrice(product.oldPrice)}
                      </span>
                      <span className="bg-rose-50 text-rose-600 text-[12.5px] font-bold px-2.5 py-1 rounded-lg">
                        You save {formatPrice(product.oldPrice - product.price)}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-[14.5px] text-slate-600 leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <span className="text-[13px] font-bold text-slate-800 block mb-2">
                      Select Colorway: <b className="text-rose-600 font-extrabold">{color}</b>
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition flex items-center gap-1.5 ${
                            color === c
                              ? "border-rose-600 bg-rose-50 text-rose-600 shadow-sm"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {color === c && <FaCheck className="text-[11px]" />}
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Purchase CTA Row */}
                <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                  <QuantityBox value={qty} onChange={setQty} max={product.stock || 99} />

                  <button
                    onClick={() => addToCart(product, qty)}
                    className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
                  >
                    <FaCartPlus className="text-[16px]" /> Add to Bag
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, qty);
                      navigate("/checkout");
                    }}
                    className="px-6 py-3 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-[14px] transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition shrink-0 ${
                      inWishlist
                        ? "bg-rose-50 border-rose-300 text-rose-600 shadow-sm"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-rose-600"
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    {inWishlist ? (
                      <FaHeart className="text-rose-600 text-[18px] heart-beat" />
                    ) : (
                      <FaRegHeart className="text-[18px]" />
                    )}
                  </button>
                </div>

                {/* Luxury Perks Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <TbTruckDelivery className="text-[24px] text-rose-500 mx-auto" />
                    <p className="text-[12px] font-bold text-slate-900 mt-1">Free Shipping</p>
                    <p className="text-[10.5px] text-slate-500">Orders over ৳2,000</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <TbRotateClockwise2 className="text-[24px] text-amber-500 mx-auto" />
                    <p className="text-[12px] font-bold text-slate-900 mt-1">7-Day Return</p>
                    <p className="text-[10.5px] text-slate-500">Easy replacement</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <TbShieldCheck className="text-[24px] text-emerald-500 mx-auto" />
                    <p className="text-[12px] font-bold text-slate-900 mt-1">1-Yr Warranty</p>
                    <p className="text-[10.5px] text-slate-500">Official card included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extended Details Tabs */}
          <div className="mt-14 pt-4 border-t border-slate-200">
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              className="border-b border-slate-200"
            >
              <Tab label="Craftsmanship & Overview" className="!normal-case !font-bold !text-[14px]" />
              <Tab label="Technical Specifications" className="!normal-case !font-bold !text-[14px]" />
              <Tab label={`Customer Reviews (${product.reviews})`} className="!normal-case !font-bold !text-[14px]" />
            </Tabs>

            <div className="py-6 max-w-4xl">
              {tab === 0 && (
                <div className="text-[14.5px] text-slate-600 leading-relaxed space-y-4">
                  <p>{product.description}</p>
                  <p>
                    Each {product.brand} timepiece undergoes rigorous horological inspection before packaging. Fitted with a high-grade {product.movement.toLowerCase()} caliber, hardened mineral crystal, and custom stainless steel clasp, it delivers unmatched luxury and lasting performance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <h5 className="font-bold text-slate-900 text-[13.5px] mb-1">
                        Precision Caliber
                      </h5>
                      <p className="text-[12.5px] text-slate-500">
                        High accuracy {product.movement.toLowerCase()} movement engineered for minimal daily deviation.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <h5 className="font-bold text-slate-900 text-[13.5px] mb-1">
                        Water Resistance ({product.waterResist})
                      </h5>
                      <p className="text-[12.5px] text-slate-500">
                        Protected against daily splashes, rain, and hand washing with sealed crown gasket.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {tab === 1 && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 max-w-2xl">
                  <table className="w-full text-[13.5px]">
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ["Brand", product.brand],
                        ["Model SKU", product.sku],
                        ["Movement Type", product.movement],
                        ["Strap Material", product.strap],
                        ["Water Resistance", product.waterResist],
                        ["Available Colorways", product.colors.join(", ")],
                        ["Warranty Coverage", "1 Year Official Brand Warranty"],
                        ["Packaging", "Original OLEVS Luxury Box & Warranty Card"],
                      ].map(([k, v]) => (
                        <tr key={k} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-bold text-slate-900 w-[220px] bg-slate-50/50">
                            {k}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 2 && (
                <ReviewsSection rating={product.rating} count={product.reviews} />
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-[22px] font-bold text-slate-900 titleUnderline mb-2">
                You May Also Admire
              </h3>
              <p className="text-[13.5px] text-slate-500 mb-6">
                Similar models and matching straps from the same collection.
              </p>
              <ProductsSlider products={related} items={5} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

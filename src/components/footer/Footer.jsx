import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery, TbShieldCheck, TbHeadset, TbRotateClockwise2 } from "react-icons/tb";
import { IoGiftOutline, IoCheckmarkCircle } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useStore } from "../../context/StoreContext";

import pm1 from "../../assets/Image/bottomstrip/carte_bleue.png";
import pm2 from "../../assets/Image/bottomstrip/visa.png";
import pm3 from "../../assets/Image/bottomstrip/master_card.png";
import pm4 from "../../assets/Image/bottomstrip/american_express.png";
import pm5 from "../../assets/Image/bottomstrip/paypal.png";

const Footer = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast({
        type: "info",
        title: "Please Enter a Valid Email",
        message: "We need your email to send exclusive VIP discounts.",
      });
      return;
    }
    setSubscribed(true);
    showToast({
      type: "success",
      title: "Welcome to the VIP Club! 🎉",
      message: "Check your inbox for your 10% coupon: OLEVS10",
    });
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800">
        <div className="container">
          {/* Top Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:border-rose-500/40 transition-all">
                <TbTruckDelivery className="text-[26px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white">Fastest Delivery</h4>
                <p className="text-[12px] text-slate-400">All across Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:border-amber-500/40 transition-all">
                <TbRotateClockwise2 className="text-[26px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white">7-Day Easy Return</h4>
                <p className="text-[12px] text-slate-400">Hassle-free exchange</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all">
                <TbShieldCheck className="text-[26px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white">Official Warranty</h4>
                <p className="text-[12px] text-slate-400">100% genuine products</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:border-blue-500/40 transition-all">
                <TbHeadset className="text-[26px]" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white">24/7 Dedicated Support</h4>
                <p className="text-[12px] text-slate-400">Instant response team</p>
              </div>
            </div>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
            {/* Col 1: About & Contact */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/">
                <img
                  src="/logo.webp"
                  alt="OLEVS Watch Shop"
                  className="w-[140px] h-auto brightness-200 contrast-125 mb-3"
                />
              </Link>
              <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
                Your premier destination for authentic luxury skeleton timepieces, automatic movements, and contemporary chronographs in Bangladesh.
              </p>

              <div className="pt-2 text-[13px] text-slate-300 space-y-1">
                <p>Sha-38/1, Middle Badda, Gulshan Link Road, Dhaka-1212</p>
                <p>
                  Hotline:{" "}
                  <a
                    href="tel:+8801799018864"
                    className="font-bold text-rose-400 hover:text-rose-300 transition"
                  >
                    (+880) 1799018864
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:contact@olevswatchshop.com"
                    className="text-slate-400 hover:text-white transition"
                  >
                    contact@olevswatchshop.com
                  </a>
                </p>
              </div>
            </div>

            {/* Col 2: Collections */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-4 tracking-wide">
                Collections
              </h4>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <Link to="/shop?category=mens-watches" className="text-slate-400 hover:text-rose-400 transition">
                    Men's Watches
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=womens-watches" className="text-slate-400 hover:text-rose-400 transition">
                    Women's Watches
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=luxury-watches" className="text-slate-400 hover:text-rose-400 transition">
                    Luxury Automatic Series
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=discount" className="text-slate-400 hover:text-rose-400 transition">
                    Hot Sale Deals (50% Off)
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=latest" className="text-slate-400 hover:text-rose-400 transition">
                    New 2024 Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-4 tracking-wide">
                Customer Care
              </h4>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <Link to="/order-tracking" className="text-slate-400 hover:text-rose-400 transition">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-slate-400 hover:text-rose-400 transition">
                    Delivery & Returns
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-slate-400 hover:text-rose-400 transition">
                    Warranty Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-400 hover:text-rose-400 transition">
                    About OWS
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-rose-400 transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-2 tracking-wide">
                Join the VIP Club
              </h4>
              <p className="text-[12.5px] text-slate-400 mb-4">
                Subscribe to unlock secret flash sales and get 10% off your first timepiece.
              </p>

              {subscribed ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[12.5px] flex items-center gap-2">
                  <IoCheckmarkCircle className="text-[18px] text-emerald-400 shrink-0" />
                  <span>Use code <b>OLEVS10</b> at checkout!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="w-full h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[13px] transition shadow-md shadow-rose-600/30"
                  >
                    Subscribe & Get 10% Off
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Legal & Payment strip */}
      <div className="bg-slate-900 text-slate-400 py-4 border-t border-slate-800/80 text-[12px]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {[
              { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
              { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
              { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
              { icon: <FaTiktok />, href: "https://tiktok.com", label: "TikTok" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white flex items-center justify-center transition text-slate-300 text-[13px]"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p>© 2024 OLEVS Watch Shop. All rights reserved. Crafted with precision.</p>

          <div className="flex items-center gap-2 opacity-80">
            <img src={pm1} alt="Carte Bleue" className="h-5 object-contain" />
            <img src={pm2} alt="Visa" className="h-5 object-contain" />
            <img src={pm3} alt="MasterCard" className="h-5 object-contain" />
            <img src={pm4} alt="American Express" className="h-5 object-contain" />
            <img src={pm5} alt="PayPal" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

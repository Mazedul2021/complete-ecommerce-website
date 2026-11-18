import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbTruckDelivery, TbShieldCheck, TbHeadset, TbRotateClockwise2 } from "react-icons/tb";
import { IoGiftOutline, IoCheckmarkCircle } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useStore } from "../../context/StoreContext";
import { api } from "../../api/client";
import { useSettings } from "../../data/useSettings";
import { FOOTER_DEFAULTS } from "../../data/footerDefaults";

import pm1 from "../../assets/Image/bottomstrip/carte_bleue.png";
import pm2 from "../../assets/Image/bottomstrip/visa.png";
import pm3 from "../../assets/Image/bottomstrip/master_card.png";
import pm4 from "../../assets/Image/bottomstrip/american_express.png";
import pm5 from "../../assets/Image/bottomstrip/paypal.png";

const BADGE_ICONS = [
  { icon: <TbTruckDelivery className="text-[26px] text-rose-500" />, ring: "group-hover:border-rose-500/40" },
  { icon: <TbRotateClockwise2 className="text-[26px] text-amber-500" />, ring: "group-hover:border-amber-500/40" },
  { icon: <TbShieldCheck className="text-[26px] text-emerald-500" />, ring: "group-hover:border-emerald-500/40" },
  { icon: <TbHeadset className="text-[26px] text-blue-500" />, ring: "group-hover:border-blue-500/40" },
];

const Footer = () => {
  const settings = useSettings();
  const footer = { ...FOOTER_DEFAULTS, ...(settings.footer || {}) };
  const { showToast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast({
        type: "info",
        title: "Please Enter a Valid Email",
        message: "We need your email to send exclusive VIP discounts.",
      });
      return;
    }
    try {
      await api.newsletter.subscribe(email);
      setSubscribed(true);
      showToast({
        type: "success",
        title: "Welcome to the VIP Club! 🎉",
        message: "You're subscribed — watch your inbox for VIP offers.",
      });
    } catch (cause) {
      showToast({
        type: "info",
        title: "Subscription Failed",
        message: cause.message,
      });
    }
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800">
        <div className="container">
          {/* Top Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
            {(footer.badges ?? []).slice(0, 4).map((badge, i) => {
              const meta = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <div key={i} className="flex items-center gap-3.5 group">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 ${meta.ring} transition-all`}>
                    {meta.icon}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">{badge.title}</h4>
                    <p className="text-[12px] text-slate-400">{badge.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
            {/* Col 1: About & Contact */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/">
                <img
                  src={settings.logo || "/logo.webp"}
                  alt="OLEVS Watch Shop"
                  className="w-[140px] h-auto brightness-200 contrast-125 mb-3"
                />
              </Link>
              <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
                {footer.about}
              </p>

              <div className="pt-2 text-[13px] text-slate-300 space-y-1">
                <p>{settings.address}</p>
                <p>
                  Hotline:{" "}
                  <a
                    href={`tel:${String(settings.supportPhone ?? "").replace(/[^+\d]/g, "")}`}
                    className="font-bold text-rose-400 hover:text-rose-300 transition"
                  >
                    {settings.supportPhone}
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${settings.supportEmail}`}
                    className="text-slate-400 hover:text-white transition"
                  >
                    {settings.supportEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Link columns */}
            {(footer.columns ?? []).map((col, ci) => (
              <div key={ci}>
                <h4 className="text-[15px] font-bold text-white mb-4 tracking-wide">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-[13px]">
                  {(col.links ?? []).map((link, li) => (
                    <li key={li}>
                      <Link to={link.link || "/"} className="text-slate-400 hover:text-rose-400 transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="text-[15px] font-bold text-white mb-2 tracking-wide">
                {footer.newsletter?.title}
              </h4>
              <p className="text-[12.5px] text-slate-400 mb-4">
                {footer.newsletter?.text}
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
                    {footer.newsletter?.button}
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
              { icon: <FaFacebookF />, href: footer.socials?.facebook || "https://facebook.com", label: "Facebook" },
              { icon: <FaInstagram />, href: footer.socials?.instagram || "https://instagram.com", label: "Instagram" },
              { icon: <FaYoutube />, href: footer.socials?.youtube || "https://youtube.com", label: "YouTube" },
              { icon: <FaTiktok />, href: footer.socials?.tiktok || "https://tiktok.com", label: "TikTok" },
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

          <p className="flex items-center gap-2">
            {footer.copyright}
            <Link
              to="/admin"
              className="text-slate-500 hover:text-rose-400 transition border-l border-slate-700 pl-2"
            >
              Admin
            </Link>
          </p>

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

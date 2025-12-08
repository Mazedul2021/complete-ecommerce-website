import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { PiKeyReturnLight } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { FaFacebookF } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

import pm1 from "../../assets/Image/bottomstrip/carte_bleue.png";
import pm2 from "../../assets/Image/bottomstrip/visa.png";
import pm3 from "../../assets/Image/bottomstrip/master_card.png";
import pm4 from "../../assets/Image/bottomstrip/american_express.png";
import pm5 from "../../assets/Image/bottomstrip/paypal.png";


import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Footer = () => {
  return (
    <>
      <footer className="py-6 bg-[#fafafa]">
        <div className="container">
          <div className="flex items-center justify-center gap-2 py-3 lg:py-8 pb-0 lg:pb-8 px-0 lg:px-5 scrollableBox footerBoxWrap">
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <TbTruckDelivery className="text-[60px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary " />
              <h3 className="text-[16px] font-[600] mt-3">Fastest Delivery</h3>
              <p className="text-[12px] font-[500]">All over Bangladesh</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <PiKeyReturnLight className="text-[60px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary " />
              <h3 className="text-[16px] font-[600] mt-3">30 Days Returns</h3>
              <p className="text-[12px] font-[500]">For an Exchange Product</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <MdPayment className="text-[60px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary " />
              <h3 className="text-[16px] font-[600] mt-3">Secured Payment</h3>
              <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <IoGiftOutline className="text-[60px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary " />
              <h3 className="text-[16px] font-[600] mt-3">Special Gifts</h3>
              <p className="text-[12px] font-[500]">Our First Product Order</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <BiSupport className="text-[60px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-primary " />
              <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
              <p className="text-[12px] font-[500]">Contact us Anytime</p>
            </div>
          </div>
          <br />
          <hr />

          <div className="footer flex px-3 lg:px-0 flex-col lg:flex-row py-8">
            <div className="part1 w-full lg:w-[25%] border-r border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] font-[600] mb-4">Contact Us</h2>
              <p className="text-[13px] font-[400] pb-4">
                Ows-The Premium Watches <br /> Sha-38/1, Middle Badda,
                Dhaka-1212
              </p>
              <Link to="mailto:contact@ows.com" className="link text-[13px]">
                contact@olevswatchshop.com
              </Link>
              <span className="text-[22px] font-[600] block w-full mt-3 mb-5 text-primary">
                (+880) 1799018864
              </span>
            </div>
            <div className="part2  w-full lg:w-[40%] flex pl-0 lg:pl-8 mt-5 lg:mt-0">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Prices drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      New products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Best sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Contact us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Sitemap
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Stores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="part2_col2 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Our company</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Legal Notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Terms and conditions of use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      About us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Secure payment
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link className="link" to="/">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="part2  w-full lg:w-[35%] flex pl-0 lg:pl-8 flex-col pr-8 mt-5 lg:mt-0">
              <h2 className="text-[18px] font-[600] mb-2 lg:mb-4">
                Subscribe to newsletter
              </h2>
              <p className="text-[13px]">
                Subscribe to our latest newsletter to get news about special
                discounts.
              </p>
              <form className="mt-5">
                <input
                  type="text"
                  className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                  placeholder="Your Email Address"
                ></input>
                <Button className="btn-org">SUBSCRIBE</Button>
                <span className="MuiTouchRipple-root"></span>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=" I agree to the terms and conditions and the privacy policy"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>
        {/*BottomStrip start here*/}
      <div className="bottomstrip border-t border-[rgba(0,0,0,0.2)] py-3 bg-white">
        <div className="container flex items-center justify-between ">
            <ul className=" flex items-center gap-3">
                <li className="list-none"><Link to="/" target="_blank" className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center group transition-all duration-300 hover:bg-primary">
                <FaFacebookF className="text-[17px] group-hover:text-white"/>
                </Link></li>
                <li className="list-none"><Link to="/" target="_blank" className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-primary">
                <CiYoutube className="text-[20px] group-hover:text-white"/>
                </Link></li>
                <li className="list-none"><Link to="/" target="_blank" className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-primary">
                <FaInstagram className="text-[17px] group-hover:text-white"/>
                </Link></li>
                <li className="list-none"><Link to="/" target="_blank" className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-primary">
                <FaTiktok className="text-[17px] group-hover:text-white"/>
                </Link></li>
            </ul>
            <p className="text-[13px] text-center mb-0">© 2024 - Olevs Watch Shop</p>
            <div className="flex items-center gap-1">
                <img src={pm1} alt="image"/>
                <img src={pm2} alt="image"/>
                <img src={pm3} alt="image"/>
                <img src={pm4} alt="image"/>
                <img src={pm5} alt="image"/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

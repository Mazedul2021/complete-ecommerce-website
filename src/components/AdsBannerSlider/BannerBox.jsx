import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="box bannerbox overflow-hidden rounded-lg group ">
      <Link to="/">
        <img src={props.img} alt="banner" className="w-full group-hover:scale-110 transition-all" />
      </Link>
    </div>
  );
};

export default BannerBox;

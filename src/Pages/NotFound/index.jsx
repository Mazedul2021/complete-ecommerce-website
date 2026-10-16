import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <div className="container py-24 text-center">
      <p className="text-[90px] font-[800] text-[#ff5252] leading-none">404</p>
      <h1 className="text-[26px] font-[700] mt-3">Oops — page not found</h1>
      <p className="text-[15px] text-[rgba(0,0,0,0.55)] mt-2 max-w-[440px] mx-auto">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <div className="flex items-center justify-center gap-3 mt-8">
        <Link to="/">
          <Button className="btn-org !normal-case !px-8">Back to Home</Button>
        </Link>
        <Link to="/shop">
          <Button
            variant="outlined"
            className="!normal-case !px-8 !border-black !text-black"
          >
            Browse Watches
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

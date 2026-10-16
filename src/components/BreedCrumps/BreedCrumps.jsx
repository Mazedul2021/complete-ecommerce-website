import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";

const BreedCrumps = ({ items = [] }) => {
  return (
    <div className="bg-white border-b border-[rgba(0,0,0,0.06)] py-3">
      <div className="container flex items-center gap-1 flex-wrap text-[13px]">
        <Link to="/" className="link font-[500]">
          Home
        </Link>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <MdOutlineNavigateNext className="text-[rgba(0,0,0,0.35)]" />
            {item.to ? (
              <Link to={item.to} className="link font-[500]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[rgba(0,0,0,0.5)]">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BreedCrumps;

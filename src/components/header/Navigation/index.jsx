import Button from "@mui/material/Button";
import React from "react";
import { Link } from "react-router-dom";
import CategoryPanel from "./CategoryPanel";
import "./style.css";

const Navigation = () => {
  return (
    <nav className="nav py-2">
      <div className="container flex items-center justify-end">
        <div className="col-1 w-[20%]">
          <CategoryPanel />
        </div>
        <div className="col-2 w-[80%]">
          <ul className="flex items-center gap-5 nav">
            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Home
                </Button>
              </Link>
            </li>

            <li className="list-none relative">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Fashion
                </Button>
              </Link>
              <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                <ul>
                  <Link to="/" className="w-full">
                    <li className="list-none w-full relative">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                        Men
                      </Button>
                       <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                      <ul>
                        <Link to="/" className="w-full">
                          <li className="list-none w-full">
                            <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                              T-shirt
                            </Button>
                          </li>
                        </Link>
                        <Link to="/" className="w-full">
                          <li className="list-none w-full">
                            <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                              Watch
                            </Button>
                          </li>
                        </Link>
                        <Link to="/" className="w-full">
                          <li className="list-none w-full">
                            <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                              Pants
                            </Button>
                          </li>
                        </Link>
                        <Link to="/" className="w-full">
                          <li className="list-none w-full">
                            <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                              Shirt
                            </Button>
                          </li>
                        </Link>
                        <Link to="/" className="w-full">
                          <li className="list-none w-full">
                            <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                              Footwear
                            </Button>
                          </li>
                        </Link>
                      </ul>
                    </div>
                    </li>
                  </Link>
                  <Link to="/" className="w-full">
                    <li className="list-none w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                        Women
                      </Button>
                    </li>
                  </Link>
                  <Link to="/" className="w-full">
                    <li className="list-none w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                        kids
                      </Button>
                    </li>
                  </Link>
                  <Link to="/" className="w-full">
                    <li className="list-none w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                        Girls
                      </Button>
                    </li>
                  </Link>
                  <Link to="/" className="w-full">
                    <li className="list-none w-full">
                      <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                        Boy
                      </Button>
                    </li>
                  </Link>
                </ul>
              </div>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Electronics
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Bags
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Footwear
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Groceries
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Beauty
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Fitness
                </Button>
              </Link>
            </li>

            <li className="list-none">
              <Link to="/" className="link transiton text-[14px] font-[500]">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  Jewellery
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

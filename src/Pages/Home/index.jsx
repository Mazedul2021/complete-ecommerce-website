import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import HomeSlider from "../../components/HomeSlider/HomeSlider";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />
      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftsec">
              <h2 className="text-[20px] font-semibold">Popular Products</h2>
              <p className="text-[15px]">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightsec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Fitness" />
                <Tab label="Jewellery" />
                <Tab label="Gadgets" />
                <Tab label="Home Appeals" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={6} />
        </div>
      </section>
      <section className="py-2 lg:py-0 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Latest Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>
      <section className="py-2 lg:py-0 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-semibold">Featured Products</h2>
          <ProductsSlider items={6} />
        </div>
      </section>
  
      <section className="py-2 lg:py-0 pt-0 bg-white">
        <div className="container">
          <AdsBannerSlider items={4} />
        </div>
      </section>
    </>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useStore } from "../../context/StoreContext";
import { IoCartOutline } from "react-icons/io5";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <>
      <BreedCrumps items={[{ label: "My Wishlist" }]} />
      <section className="py-8 bg-white min-h-[50vh]">
        <div className="container">
          <h1 className="text-[26px] font-[700] mb-1">My Wishlist</h1>
          <p className="text-[14px] text-[rgba(0,0,0,0.5)] mb-6">
            {wishlist.length} saved item{wishlist.length !== 1 && "s"}
          </p>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-[64px]">💜</span>
              <h2 className="text-[22px] font-[700] mt-4">
                Your wishlist is empty
              </h2>
              <p className="text-[rgba(0,0,0,0.5)] mt-2">
                Tap the heart on any product to save it here for later.
              </p>
              <Link to="/shop">
                <Button className="btn-org !mt-6 !normal-case !px-8">
                  Explore Watches
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => {
                    wishlist.forEach((p) => {
                      if (!p.stock || p.stock > 0) addToCart(p);
                    });
                    wishlist.forEach((p) => toggleWishlist(p));
                  }}
                  variant="outlined"
                  className="!normal-case gap-2 !border-black !text-black hover:!border-[#ff5252] hover:!text-[#ff5252]"
                  startIcon={<IoCartOutline />}
                >
                  Move All to Cart
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {wishlist.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;

import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const CartDrawer = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    updateCartQty,
    removeFromCart,
    cartDrawerOpen,
    setCartDrawerOpen,
  } = useStore();

  return (
    <Drawer
      anchor="right"
      open={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
    >
      <div className="w-[360px] max-w-[90vw] h-full flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-[16px] font-[600]">
            Shopping Cart{" "}
            <span className="text-[13px] text-[rgba(0,0,0,0.5)] font-[400]">
              ({cartCount} items)
            </span>
          </h3>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="text-[24px] leading-none text-[rgba(0,0,0,0.6)] hover:text-[#ff5252]"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-[54px]">🛒</span>
            <p className="text-[15px] font-[500]">Your cart is empty</p>
            <p className="text-[13px] text-[rgba(0,0,0,0.5)]">
              Add some beautiful watches to get started.
            </p>
            <Link to="/shop" onClick={() => setCartDrawerOpen(false)}>
              <Button className="btn-org !mt-3 !normal-case">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {cart.map(({ product, qty }) => {
                const disc = discountPercent(product.price, product.oldPrice);
                return (
                  <div
                    key={product.id}
                    className="flex gap-3 py-3 border-b border-[rgba(0,0,0,0.06)]"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setCartDrawerOpen(false)}
                      className="w-[70px] h-[70px] shrink-0 bg-[#f7f7f7] rounded-md overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-[600] text-[#ff5252] uppercase">
                        {product.brand}
                        {disc > 0 && (
                          <span className="ml-2 bg-[#fff5f5] px-1.5 rounded">
                            -{disc}%
                          </span>
                        )}
                      </p>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setCartDrawerOpen(false)}
                        className="text-[13px] font-[500] line-clamp-2 hover:text-[#ff5252]"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() => updateCartQty(product.id, qty - 1)}
                            className="w-[26px] h-[26px] text-[15px] hover:bg-[#f1f1f1]"
                          >
                            −
                          </button>
                          <span className="w-[30px] text-center text-[13px] font-[500]">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateCartQty(product.id, qty + 1)}
                            className="w-[26px] h-[26px] text-[15px] hover:bg-[#f1f1f1]"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[13px] font-[600] text-[#ff5252]">
                          {formatPrice(product.price * qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[18px] text-[rgba(0,0,0,0.35)] hover:text-[#ff5252] self-start"
                      aria-label="Remove item"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[14px] font-[500]">Subtotal</span>
                <span className="text-[18px] font-[700] text-[#ff5252]">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <p className="text-[12px] text-[rgba(0,0,0,0.5)] mb-3">
                {cartTotal >= 2000
                  ? "🎉 You've unlocked FREE shipping!"
                  : `Add ${formatPrice(2000 - cartTotal)} more for free shipping.`}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/cart" onClick={() => setCartDrawerOpen(false)}>
                  <Button variant="outlined" className="!w-full !normal-case !border-black !text-black">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={() => setCartDrawerOpen(false)}>
                  <Button className="btn-org !w-full !normal-case">Checkout</Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/Footer";
import CartDrawer from "./CartDrawer/CartDrawer";
import MobileNav from "./MobileNav/MobileNav";
import QuickViewModal from "./QuickViewModal/QuickViewModal";
import ToastNotification from "./Toast/ToastNotification";
import { BackToTop } from "./ScrollToTop/ScrollToTop";

const StoreLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <CartDrawer />
    <MobileNav />
    <QuickViewModal />
    <ToastNotification />
    <BackToTop />
  </>
);

export default StoreLayout;

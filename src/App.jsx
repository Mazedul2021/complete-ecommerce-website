import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StoreProvider } from "./context/StoreContext";
import Header from "./components/header/header";
import Home from "./Pages/Home";
import ProductListing from "./components/ProductListing/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Wishlist from "./Pages/Wishlist";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import OrderTracking from "./Pages/OrderTracking";
import HelpCenter from "./Pages/HelpCenter";
import NotFound from "./Pages/NotFound";
import Footer from "./components/footer/Footer";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import MobileNav from "./components/MobileNav/MobileNav";
import { ScrollToTop, BackToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/shop"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
            <Route path={"/cart"} exact={true} element={<Cart />} />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/wishlist"} exact={true} element={<Wishlist />} />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/about"} exact={true} element={<About />} />
            <Route path={"/contact"} exact={true} element={<Contact />} />
            <Route path={"/order-tracking"} exact={true} element={<OrderTracking />} />
            <Route path={"/help-center"} exact={true} element={<HelpCenter />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <MobileNav />
        <BackToTop />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

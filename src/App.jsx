import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";
import StoreLayout from "./components/StoreLayout";
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
import Account from "./Pages/Account";
import HelpCenter from "./Pages/HelpCenter";
import NotFound from "./Pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { AdminProvider } from "./admin/AdminContext";
import AdminGuard from "./admin/AdminGuard";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminCategories from "./admin/pages/Categories";
import AdminHomepage from "./admin/pages/Homepage";
import AdminCoupons from "./admin/pages/Coupons";
import AdminReviews from "./admin/pages/Reviews";
import AdminInbox from "./admin/pages/Messages";
import AdminOrders from "./admin/pages/Orders";
import AdminCustomers from "./admin/pages/Customers";
import AdminSettings from "./admin/pages/Settings";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<StoreLayout />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/shop"} element={<ProductListing />} />
            <Route path={"/product/:id"} element={<ProductDetails />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/wishlist"} element={<Wishlist />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/order-tracking"} element={<OrderTracking />} />
            <Route path={"/account"} element={<Account />} />
            <Route path={"/help-center"} element={<HelpCenter />} />
            <Route path={"*"} element={<NotFound />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminProvider>
                  <AdminLayout />
                </AdminProvider>
              </AdminGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="homepage" element={<AdminHomepage />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="inbox" element={<AdminInbox />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
    </AuthProvider>
  );
}

export default App;

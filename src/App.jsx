import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./Pages/Home";
import ProductListing from "./components/ProductListing/ProductListing";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home />} />
          <Route path={"/ProductListing"} exact={true} element={<ProductListing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import AboutUsPage from "./aboutUsPage";
import ContactPage from "./contactPage";
import Home from "./homeContent";
import Footer from "../components/footer";
import { useEffect } from "react"; 

export default function HomePage() {
  const location = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); 

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/*" element={<h1 className="text-center py-20 text-3xl">Page not found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
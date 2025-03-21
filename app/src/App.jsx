// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import WhatsAppButton from "./Components/WhatsApp";
import NotFound from "./Components/NotFound";
import DashBoard from "./Components/dashboard";
import Identity from "./Components/whoweare";
import Contact from "./Components/Contact";
import Shop from "./Components/Shop";
import PaymentOptions from "./Components/PaymentOptions";
import ErrorBoundary from "./Components/ErrorBoundary";
import MaleCategoriesSlider from "./Components/MaleCategoriesSlider";
import MensSlider from "./Components/Swiper";
import { AuthProvider } from "./Components/authcontext";
import { useAuthContext } from "./Components/authcontext";

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuthContext();

  return (
    <div className="overflow-x-hidden">
      <Header />

      {/* Show sliders only on the home page */}
      {location.pathname === "/" && (
        <>
          <MensSlider />
          <MaleCategoriesSlider />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={
            <ErrorBoundary>
              <ProductDetails />
            </ErrorBoundary>
          }
        />
        <Route path="/cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />

        {/* Only show dashboard route for admin users */}
        {user && user.role === "admin" && (
          <Route path="/dashboard" element={<ErrorBoundary><DashBoard /></ErrorBoundary>} />
        )}

        <Route path="/identity" element={<ErrorBoundary><Identity /></ErrorBoundary>} />
        <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
        <Route path="/shop" element={<ErrorBoundary><Shop /></ErrorBoundary>} />
        <Route path="/paymentoptions" element={<ErrorBoundary><PaymentOptions /></ErrorBoundary>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </Router>
);

export default App;

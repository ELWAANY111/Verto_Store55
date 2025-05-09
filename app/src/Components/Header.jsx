import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search, Plus, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "./cartStore"; // Ensure the correct path
import { useAuthContext } from "./authcontext"; // Using our auth context

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext(); // Accessing user from AuthContext

  // Calculate total items in the cart (based on quantity)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // For debugging: log the user retrieved from localStorage via AuthContext
  useEffect(() => {
    console.log("Navbar - User from context:", user);
  }, [user]);

  return (
    <>
      {/* Promotional Bar */}
      <div className="sticky bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black text-center py-2 text-sm font-bold animate-pulse top-0 z-40">
        🚚 Free shipping on orders above 1499 EGP! Don’t miss the chance ✨
      </div>

      {/* Sticky Header */}
      <header className="w-full flex items-center justify-between  shadow-lg bg-black text-white relative rounded-b-lg sticky top-0 z-50">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 bg-[#222222] rounded-full text-white hover:bg-[#333333] transition"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-2xl font-bold">
            <img
              src="/1741376508341.png"
              alt="Logo"
              className="w-36 h-36 object-contain filter brightness-150"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-40">
          <Link to="/" className="hover:text-[#FFD700] text-lg font-bold transition">
            Home
          </Link>
          <Link to="/Identity" className="hover:text-[#FFD700] text-lg font-bold transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-[#FFD700] text-lg font-bold transition">
            Contact Us
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="relative flex items-center border border-[#B8860B] rounded-lg overflow-hidden w-48 md:w-72 bg-[#222222]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#222222] text-white outline-none p-2 text-base placeholder-gray-400"
          />
          <button className="p-2 bg-[#444444] text-white hover:bg-[#FFD700] hover:text-black transition">
            <Search size={20} />
          </button>
        </div>

        {/* Additional Icons */}
        <div className="flex items-center space-x-4">
          {/* Render Plus icon only for admin */}
          {user && user.role === "admin" && (
            <Link
              to="/dashboard"
              className="p-2 bg-[#FFD700] text-black rounded-full shadow-md hover:bg-[#B8860B] transition"
            >
              <Plus size={20} />
            </Link>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-8 h-8 text-white hover:text-[#FFD700] transition" />
            {cartCount > 0 && (
              <span className="absolute top-[-4px] right-[-6px] w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* New Collection Banner */}
      <div className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black text-center py-3 text-lg font-bold animate-bounce sticky top-12 z-40">
        🌞 The Summer Collection is now available! Get the latest trends 🌴🛍️
      </div>

      {/* Mobile Sidebar Menu with Smooth Transition */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-opacity-40 z-50 transform transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 w-80 bg-[#333333] h-auto p-5 shadow-lg rounded-br-2xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col space-y-6 mt-10 text-white text-lg">
            <Link
              to="/"
              className="hover:text-[#FFD700] text-lg font-bold transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/Identity"
              className="hover:text-[#FFD700] text-lg font-bold transition"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#FFD700] text-lg font-bold transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

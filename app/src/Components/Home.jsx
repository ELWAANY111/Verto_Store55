import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("❌ Unexpected response format:", res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">منتجاتنا</h1>

      {loading ? (
        <p className="text-center text-gray-500">جارٍ تحميل المنتجات...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">⚠️ لا توجد منتجات متاحة.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4
                         transition-transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Image container with a fixed aspect ratio */}
              <div className="overflow-hidden rounded-lg aspect-square">
                <img
                  src={
                    product.images?.[0]
                      ? `${BASE_URL}${product.images[0]}`
                      : "/default-image.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold text-black mt-4">
                {product.name}
              </h2>

              <div className="mt-2">
                <p className="text-base text-gray-600">
                  <span className="font-bold">السعر الأصلي:</span>{" "}
                  <span className="line-through">
                    {product.priceBeforeDiscount} جنيه
                  </span>
                </p>
                <p className="text-lg font-bold text-black">
                  <span className="font-bold">السعر بعد الخصم:</span>{" "}
                  {product.priceAfterDiscount} جنيه
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-2">
                استفد من أفضل العروض والخصومات!
              </p>

              <Link
                to={`/product/${product._id}`}
                className="block text-center bg-black text-white font-semibold
                           py-2 px-4 rounded mt-4 hover:bg-gray-800 transition-colors"
              >
                عرض التفاصيل
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

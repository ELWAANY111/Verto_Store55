import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ProductDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceBeforeDiscount: "",
    priceAfterDiscount: "",
    category: "Perfume",
    stock: "",
    brand: "",
    sizes: [],
    colors: [],
    images: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const colorOptions = [
    "أحمر", "أزرق", "أخضر", "أصفر", "أسود", "أبيض", "أرجواني", "وردي", "برتقالي", "بني",
    "رمادي", "ذهبي", "فضي", "بيج", "عاجي", "سماوي", "ماجنتا", "تركوازي", "زمردي", "ليموني",
    "بنفسجي", "ماروني", "كحلي", "لافندر", "خوخي", "شعبي", "قرمزي", "نيلي", "أكوا", "زيتوني"
  ];

  const sizeOptions = ["S", "M", "L", "XL", "3XL"];

  useEffect(() => {
    fetchProducts();
  }, []);

  // جلب كل المنتجات
  const fetchProducts = async () => {
    try {
const response = await axios.get(`${BASE_URL}/api/products`);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("❌ Unexpected response format:", response.data);
        setProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setLoading(false);
    }
  };

  // التعامل مع تغييرات الحقول النصية والأرقام
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // التعامل مع رفع الصور
  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  // التعامل مع تغييرات المقاسات والألوان (اختيار متعدد)
  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    const currentValues = formData[name] || [];
    if (currentValues.includes(value)) {
      setFormData({ ...formData, [name]: currentValues.filter((item) => item !== value) });
    } else {
      setFormData({ ...formData, [name]: [...currentValues, value] });
    }
  };

  // التعامل مع إرسال النموذج (إضافة المنتج)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    // إضافة الحقول الفردية
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("priceBeforeDiscount", formData.priceBeforeDiscount);
    form.append("priceAfterDiscount", formData.priceAfterDiscount);
    form.append("category", formData.category);
    form.append("stock", formData.stock);
    form.append("brand", formData.brand);
    // إضافة المقاسات والألوان كحقول متعددة
    formData.sizes.forEach((size) => form.append("sizes", size));
    formData.colors.forEach((color) => form.append("colors", color));
    // إضافة الصور (إن وجدت)
    for (let i = 0; i < formData.images.length; i++) {
      form.append("images", formData.images[i]);
    }

    try {
      await axios.post(`${BASE_URL}/api/products`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ تم إضافة المنتج بنجاح!");
      setFormData({
        name: "",
        description: "",
        priceBeforeDiscount: "",
        priceAfterDiscount: "",
        category: "Perfume",
        stock: "",
        brand: "",
        sizes: [],
        colors: [],
        images: [],
      });
      fetchProducts(); // إعادة تحميل قائمة المنتجات
    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error.message);
      alert("⚠️ حدث خطأ أثناء إضافة المنتج!");
    }
  };

  // حذف منتج
  const handleDelete = async (productId) => {
    if (!window.confirm("⚠️ هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await axios.delete(`${BASE_URL}/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      alert("✅ تم حذف المنتج بنجاح!");
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("⚠️ حدث خطأ أثناء حذف المنتج!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ➕ نموذج إضافة منتج */}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md mb-8 space-y-4">
        <h2 className="text-2xl font-bold mb-4">إضافة منتج</h2>

        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="الوصف"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="priceBeforeDiscount"
          placeholder="السعر قبل الخصم"
          value={formData.priceBeforeDiscount}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="priceAfterDiscount"
          placeholder="السعر بعد الخصم"
          value={formData.priceAfterDiscount}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="Perfume">عطر</option>
          <option value="Watches">ساعات</option>
          <option value="Clothes">ملابس</option>
        </select>

        <input
          type="text"
          name="brand"
          placeholder="العلامة التجارية"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="stock"
          placeholder="المخزون"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* اختيار المقاسات */}
        <div className="space-y-2">
          <label className="block font-semibold">اختر المقاسات:</label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={handleMultiSelectChange}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* اختيار الألوان */}
        <div className="space-y-2">
          <label className="block font-semibold">اختر الألوان:</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <label key={color} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="colors"
                  value={color}
                  checked={formData.colors.includes(color)}
                  onChange={handleMultiSelectChange}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* رفع الصور */}
        <div>
          <label className="block font-semibold mb-1">رفع الصور:</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="w-full"
            multiple
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          إضافة المنتج
        </button>
      </form>

      {/* 📦 قائمة المنتجات */}
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">📦 قائمة المنتجات</h2>
        {loading ? (
          <h2 className="text-center">جاري تحميل المنتجات...</h2>
        ) : products.length === 0 ? (
          <p className="text-gray-500">⚠️ لا يوجد منتجات متاحة.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">الصورة</th>
                <th className="border p-2">الاسم</th>
                <th className="border p-2">السعر بعد الخصم</th>
                <th className="border p-2">المخزون</th>
                <th className="border p-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border">
                  <td className="border p-2 text-center">
                    <img
                      src={`${BASE_URL}${product.images?.[0] || "/default-image.jpg"}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.priceAfterDiscount} EGP</td>
                  <td className="border p-2">
                    {Array.isArray(product.stock)
                      ? product.stock.map((item) => item.quantity).join(", ")
                      : product.stock}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      حذف ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductDashboard;

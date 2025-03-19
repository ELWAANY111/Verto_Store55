const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// إعداد البريد الإلكتروني باستخدام Gmail أو أي مزود SMTP آخر
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // بريدك الإلكتروني
    pass: process.env.EMAIL_PASS, // كلمة المرور أو "App Password"
  },
});

router.post("/", async (req, res) => {
  try {
    const { fullName, address, city, zipCode, phone, paymentMethod, cartItems } = req.body;
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // حفظ الطلب في قاعدة البيانات
    const newOrder = new Order({
      fullName,
      address,
      city,
      zipCode,
      phone,
      paymentMethod,
      cartItems,
      totalPrice,
    });
    await newOrder.save();

    // إرسال البريد الإلكتروني
    const mailOptions = {
      from: `"Store Admin" <${process.env.EMAIL_USER}>`,
      to: "admin-email@example.com", // ضع هنا إيميل المدير
      subject: "🚀 طلب جديد!",
      text: `طلب جديد من ${fullName}، المبلغ الإجمالي: ${totalPrice} جنيه.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 تم إرسال البريد:", info.response);

    res.status(201).json({
      message: "✅ تم تقديم الطلب بنجاح!",
    });
  } catch (error) {
    console.error("❌ خطأ في إرسال الطلب:", error);
    res.status(500).json({ message: "حدث خطأ أثناء إرسال البريد الإلكتروني" });
  }
});

module.exports = router;

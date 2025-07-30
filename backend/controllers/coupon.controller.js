import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    // Fetch the coupon for the authenticated user
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json(coupon);
  } catch (error) {
    console.log("Error in getCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body; // Assuming the coupon code is passed as a body

    // Find the coupon by code and check if it's active
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid or inactive coupon" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false; // Mark the coupon as inactive if expired
      await coupon.save();
      return res.status(400).json({ message: "Coupon has expired" });
    }

    res.json({ valid: true, discount: coupon.discount });
  } catch (error) {
    console.log("Error in validateCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

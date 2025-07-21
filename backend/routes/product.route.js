import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRotute } from "../middleware/auth.middleware.js";

const router = express.Router();

// endpoints // routes
router.get("/", protectRotute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendation", getRecommendedProducts);
router.post("/", protectRotute, adminRoute, createProduct);
router.patch("/:id", protectRotute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRotute, adminRoute, deleteProduct);

export default router;

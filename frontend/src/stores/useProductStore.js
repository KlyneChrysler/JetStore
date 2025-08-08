import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios.js";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", productData);

      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      console.log("Error creating product", error);
      set({ loading: false });
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      console.log("Error fetching products", error);
      set({ loading: false });
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      console.log("Error fetching products by category", error);
      set({ loading: false });
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.patch(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });

    try {
      await axios.delete(`/products/${productId}`);

      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error deleting product", error);
      set({ loading: false });
      toast.error(
        error.response?.data.message ||
          "Something went wrong. Please try again."
      );
    }
  },
}));

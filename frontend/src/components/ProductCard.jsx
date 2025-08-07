import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col rounded-3xl bg-[rgba(245,235,220,1)] overflow-hidden border-t-5 shadow-lg hover:scale-105 transition duration-500 ease-in-out">
      <h1 className="absolute top-0 right-0 mr-6 text-white text-xl font-thin tracking-wide bg-lime-900 hover:bg-lime-800 bg-opacity-60 px-3 py-2 rounded-bl-md rounded-br-md z-30 hover:scale-110 border-t-4 hover:border-t-8 border-t-amber-200 transition duration-1000 ease-in-out">
        {product.name}
      </h1>
      <div className="relative flex h-full overflow-hidden rounded-xl">
        <img
          className="object-cover object-center w-full"
          src={product.image}
          alt="Product Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-2xl font-thin tracking-widest text-black">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-indigo-800/50 tracking-wider px-5 py-2.5 text-center text-sm font-thin text-white hover:bg-indigo-800/70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast("Please sign in to add items.", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex w-90 h-[400px] bg-[rgba(245,235,220,1)] relative flex-col rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out">
      {/* <h1 className="absolute top-0 right-0 mr-6 text-white text-xl font-thin tracking-wide bg-lime-900 hover:bg-lime-800 bg-opacity-60 px-3 py-2 rounded-bl-md rounded-br-md z-30 hover:scale-110 border-t-4 hover:border-t-8 border-t-amber-200 transition duration-1000 ease-in-out">
        {product.name}
      </h1> */}
      <div className="relative flex h-60 overflow-hidden">
        <img
          className="object-cover object-center w-96 h-50"
          src={product.image}
          alt="Product Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="px-5 pb-5 bg-[rgba(245,235,220,1)]">
        <h5 className="text-2xl font-thin mt-2 tracking-widest text-black">
          {product.name}
        </h5>

        <div className="grid grid-cols-2 w-full items-end justify-between mt-10">
          <div className="w-full">
            <h6 className="text-sm font-thin tracking-widest text-black">
              PRICE
            </h6>
            <p>
              <span className="text-3xl font-semibold/60 text-indigo-800/50">
                ${product.price}
              </span>
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="flex items-center justify-center rounded-lg bg-indigo-800/50 tracking-wider px-5 py-2.5 text-center text-sm font-extralight text-white hover:bg-indigo-800/70 focus:outline-none focus:ring-1 focus:ring-indigo-300 hover:scale-105 transition-transform duration-500 ease-in-out"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

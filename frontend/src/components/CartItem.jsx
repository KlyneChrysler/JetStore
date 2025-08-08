import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="group relative bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-indigo-100/20 transition-all duration-500 hover:-translate-y-1">
      {/* Remove button */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="absolute top-4 right-4 p-2 bg-opacity-100 rounded-full text-black bg-gray-100/80 hover:bg-red-50 hover:scale-125 hover:text-red-500 transition-all duration-500 opacity-0 group-hover:opacity-100"
        aria-label="Remove item"
      >
        <X size={16} />
      </button>

      <div className="flex gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-gray-50">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 object-cover transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h3 className="text-xl font-extralight text-gray-900 hover:text-indigo-800/50 tracking-wide truncate mb-1">
              {item.name}
            </h3>
            <p className="text-sm font-thin text-gray-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Price and Quantity Row */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Price
              </span>
              <span className="text-2xl font-semibold/60 text-indigo-800/50">
                ${item.price}
              </span>
            </div>

            <div className="flex flex-col items-start gap-1">
              {/* <span className="text-xs text-gray-500 uppercase tracking-wide">
                Qty
              </span> */}
              <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="p-1.5 rounded-md hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-125 transition-all duration-500 ease-in-out"
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus
                    size={14}
                    className="text-gray-600 hover:scale-125 transition-transform duration-500 ease-in-out"
                  />
                </button>

                <span className="min-w-[2rem] text-center text-xl font-medium text-gray-900/60">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1.5 rounded-md hover:bg-white hover:shadow-sm hover:scale-125 transition-all duration-500 ease-in-out"
                  aria-label="Increase quantity"
                >
                  <Plus
                    size={14}
                    className="text-gray-600 hover:scale-125 transition-transform duration-500 ease-in-out"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

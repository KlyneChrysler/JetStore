import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] gap-4 p-4 md:p-6 rounded-3xl hover:scale-105 transition-transform duration-500 ease-in-out shadow-xl bg-red-50/10 border-0 border-black/10">
      <div className="row-span-3">
        <img
          className="h-20 w-20 md:h-32 md:w-32 rounded object-cover"
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="w-full flex flex-wrap items-center gap-2">
        <p className="text-2xl font-thin tracking-wider text-black hover:scale-105 hover:text-indigo-800/90 transition-transform duration-300 ease-in-out">
          {item.name}
        </p>

        <p className="text-sm text-black font-thin tracking-wide">
          {item.description}
        </p>
      </div>

      <div className="justify-self-end">
        <button
          className="p-1 rounded-full"
          onClick={() => removeFromCart(item._id)}
        >
          <X className="text-black hover:text-red-600" />
        </button>
      </div>

      <div className="self-end">
        <p className="text-2xl font-bold text-indigo-800/50 px-2 py-1 rounded">
          <div className="grid grid-rows-2">
            <span className="font-thin text-sm mt-5 text-black">PRICE</span>$
            {item.price}
          </div>
        </p>
      </div>

      <div className="flex items-center gap-2 justify-self-end self-end p-2 rounded-lg">
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/25 px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10"
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
        >
          <Minus className="text-slate-500" size={14} />
        </button>

        <p className="text-slate-500">{item.quantity}</p>

        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/25 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10"
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
        >
          <Plus className="text-slate-500" size={14} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

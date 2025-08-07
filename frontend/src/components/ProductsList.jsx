import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";
import { Star, Trash } from "lucide-react";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="bg-transparent shadow-lg rounded-sm mb-24 max-w-full mx-auto mt-16 border-transparent border-b-2 border-r-fuchsia-600 border-lime-400 transition-all duration-300 ease-in-out hover:scale-110"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-slate-400/20">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase text-sm font-thin mb-6 text-white tracking-widest"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase text-sm font-thin mb-6 text-white tracking-widest"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase text-sm font-thin mb-6 text-white tracking-widest"
            >
              Category
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left uppercase text-sm font-thin mb-6 text-white tracking-widest"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left uppercase text-sm font-thin mb-6 text-white tracking-widest"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-fuchsia-600/20">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-thin tracking-widest text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-thin tracking-widest text-white">
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-thin tracking-widest text-white">
                  {product.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-300 text-black"
                      : "bg-slate-500/20 text-gray-300"
                  } hover:bg-yellow-500 hover:text-black transition-colors duration-300`}
                >
                  <Star className="h-5 w-5" strokeWidth="1" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-600 transition-colors duration-300"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;

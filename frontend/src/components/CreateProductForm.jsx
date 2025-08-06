import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Loader, PlusCircle, Upload } from "lucide-react";

const categories = [
  "bouquets",
  "roses",
  "seasonal",
  "events",
  "plants",
  "luxury",
  "sympathy",
  "celebrations",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const loading = false; // Replace with actual loading state later

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);
    // Handle form submission logic here
  };

  return (
    <motion.div
      className="b-gray-800 shadow-lg rounded-sm p-8 mb-24 max-w-full mx-auto mt-16 border-transparent border-b-4 border-r-4  border-lime-300 transition-all duration-300 ease-in-out hover:scale-110"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <h2 className="text-2xl font-thin mb-6 text-white tracking-widest">
        Add to Store
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div>
            <label
              htmlFor="name"
              className="block mb-3 text-sm font-thin text-white tracking-widest"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="mt-1 mb-5 block w-1/2 p-2 border border-gray-600 rounded-md bg-gray-700 shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-3 text-sm font-thin text-white tracking-widest"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              row="3"
              className="mt-1 mb-5 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300"
              required
            ></textarea>
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-3 text-sm font-thin text-white tracking-widest"
          >
            Price
          </label>
          <input
            typ="number"
            type="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 mb-5 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-3 text-sm font-thin text-white tracking-widest"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 mb-10 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 shadow-sm px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-300"
            required
          >
            <option
              className="font-thin text-white tracking-widest"
              value=""
              disabled={true}
            >
              Click to view
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* // TODO: Add image upload functionality onChange */}
        <div className="mt-1 flex items-center">
          <input type="file" id="image" className="sr-only" accept="image/" />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm loading-4  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600 transition-colors font-thin text-white tracking-widest"
          >
            <Image className="size-5 inline-block mr-2 " />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-400">
              {newProduct.image}
            </span>
          )}
        </div>

        <button
          className="w-1./2 flex justify-items-end py-4 px-4 mt-5 shadow-sm text-2xl font-thin text-white bg-fuchsia-500 hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              {/* <PlusCircle className="mr-2 size-5" /> */}
              CONTINUE
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;

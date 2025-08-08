import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Loader, Paperclip, PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

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

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(newProduct);
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("Error creating product", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file); // Convert to base64 url
    }
  };

  return (
    <motion.div
      className="bg-slate-400/20 shadow-lg rounded-sm p-8 mb-24 max-w-full mx-auto mt-16 border-transparent border-b-2 border-r-fuchsia-600 border-lime-300 transition-all duration-300 ease-in-out hover:scale-110"
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
              className="mt-1 mb-5 block w-3/4 p-2 border-b border-gray-600 bg-transparent shadow-sm px-3 py-2 text-white focus:outline-none focus:border-b-lime-300 hover:border-b-lime-300"
              placeholder="Enter your product name"
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
              className="mt-1 mb-5 block w-full p-2 border-b border-gray-600 bg-transparent shadow-sm px-3 py-2 text-white focus:outline-none  focus:border-b-lime-300 hover:border-b-lime-300"
              placeholder="Enter your product description"
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
            className="mt-1 mb-5 block w-1/4 p-2 border-b border-gray-600  bg-transparent shadow-sm px-3 py-2 text-white focus:outline-none focus:border-b-lime-300 hover:border-b-lime-300"
            placeholder="Enter your product price"
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
            className="mt-1 mb-10 block w-1/5 p-2 border-l border-gray-600 bg-transparent shadow-sm px-3 py-2 text-gray-400 font-thin focus:outline-none  focus:border-l-lime-300 hover:border-l-lime-300"
            required
          >
            <option
              className="font-sans text-gray tracking-widest"
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
        <div className="mt-1 grid grid-row-1">
          <p className="font-thin mb-3 text-sm text-white tracking-widest">
            This field is required and highly recommended. Attach an image to
            support your products.
          </p>
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer mb-10 w-1/6 bg-gray-600/70 py-2 px-3 border border-gray-600  shadow-sm text-sm loading-4  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600 transition-colors font-thin text-white tracking-widest"
          >
            <Paperclip className="size-5 inline-block mr-2" />
            Upload a file
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-lime-400 font-thin tracking-widest">
              File uploaded
            </span>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="w-1./2 flex flex-col-reverse py-4 px-6 mt-5 shadow-sm text-2xl font-thin text-white bg-fuchsia-500/20 border-transparent border-b-2 border-l-2 border-fuchsia-500 hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                LOADING
              </div>
            ) : (
              <>
                {/* <PlusCircle className="mr-2 size-5" /> */}
                CONTINUE
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;

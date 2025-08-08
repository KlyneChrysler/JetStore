import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
  return (
    <motion.div
      className="relative overflow-hidden w-full max-w-full h-[300px] bg-white rounded-3xl shadow-md group hover:scale-105 hover:shadow-lg"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Link
        to={"/category" + category.href}
        className="group hover:scale-105 transition-transform duration-500 ease-in-out"
      >
        <div className="relative w-full h-full overflow-hidden rounded-2xl group hover:shadow-xl ">
          {/* Background Image */}
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 z-0"
          />

          {/* Top-right Title */}
          <h1 className="absolute top-0 right-0 mr-6 text-white text-xl font-thin tracking-wide bg-lime-900 hover:bg-lime-800 bg-opacity-60 px-3 py-2 rounded-bl-md rounded-br-md z-30 hover:scale-110 border-t-4 hover:border-t-8 border-t-amber-200 transition duration-1000 ease-in-out">
            {category.name}
          </h1>

          {/* Bottom Overlay with "EXPLORE" */}
          <div className="absolute bottom-4 left-0 right-0 z-20">
            <p className="transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out w-1/2 text-yellow-900 hover:bg-yellow-200 bg-yellow-100  text-1xl font-bold hover:font-extrabold tracking-wider py-3 text-center rounded-br-2xl rounded-tr-2xl">
              SHOP NOW
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryItem;

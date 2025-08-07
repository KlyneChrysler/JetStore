import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "products", label: "STOCKS", icon: ShoppingBasket },
  { id: "create", label: "MY STORE", icon: PlusCircle },
  { id: "analytics", label: "REPORTS", icon: BarChart },
];
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const { fetchAllProducts } = useProductStore();

  useState(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <motion.div
      className="min-h-screen bg-[#1c1c1c] text-white relative overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* <div className="absolute inset-0 flex z-0">
        <img
          src={sign_in_wave}
          alt="Sign In Wave"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="relative z-10 container px-4 py-16 mx-auto mt-12">
        {/* <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-600 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Admin Dashboard
        </motion.h1> */}
        {/* <img src="" alt="" /> */}

        <div className="flex justify-start mb-8 gap-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-8 py-3 mx-2  transition-all duration-500 tracking-widest hover:scale-110 rounded-sm ease-in-out  ${
                activeTab === tab.id
                  ? "bg-fuchsia-500 hover:bg-fuchsia-600 border-transparent border-b-2 border-l-2 border-lime-300 text-white font-thin transition-transform duration-500 ease-in-out"
                  : "bg-transparent border-transparent border-b-2 border-l-2 border-lime-300 font-thin text-fuchsia-300 hover:bg-fuchsia-600 hover:text-white font-handwriting"
              }`}
            >
              {/* <tab.icon className="mr-2 h-5 w-5" /> */}
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </motion.div>
  );
};

export default AdminPage;

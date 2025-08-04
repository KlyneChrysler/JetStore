import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false; // Replace with actual user authentication logic
  const isAdmin = true; // Replace with actual admin check logic

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[rgba(245,235,220,1)] backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-none">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-wrap justify-between items-center h-full">
          <Link
            to="/"
            className="text-3xl font-thin tracking-tighter text-black items-center space-x-2 flex"
          >
            {/* <span className="font-serif mr-3">JS </span>  */}
            JetStore
          </Link>
          <nav className="flex flex-wrap items-center gap-14">
            <Link
              to={"/"}
              className="font-mono text-black hover hover:text-lime-600 transition duration-300 ease-in-out"
            >
              HOME
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group font-mono text-black hover hover:text-lime-600 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-lime-600"
                  size={20}
                />
                <span className="hidden sm:inline font-mono">CART</span>
                <span className="absolute -top-2 -left-2 bg-lime-900 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-lime-600 transition duration-300 ease-in-out">
                  {/* {cart.length} */}3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link className="text-black hover:text-lime-600 font-mono px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
                {/* <LayoutDashboard className="inline-block mr-1" size={25} /> */}
                <span className="hidden sm:inline font-mono">DASHBOARD</span>
              </Link>
            )}
            {user ? (
              <div className="flex items-center h-full">
                <button className="font-thin bg-[rgb(206,225,122)] hover:bg-[rgb(159,172,104)] text-black hover:text-lime-900 font-mono px-4 py-3 h-full flex items-center transition duration-300 ease-in-out">
                  <CircleUser strokeWidth={0.75} className="h-10 w-10" />
                  {/* <span className="hidden sm:inline ml-2">LOG OUT</span> */}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 h-full">
                <Link
                  to={"/login"}
                  className="font-thin bg-[rgb(206,225,122)] hover:bg-[rgb(159,172,104)] text-black hover:text-lime-900 font-mono px-4 py-5 h-full flex items-center transition duration-300 ease-in-out"
                >
                  SIGN IN
                </Link>
                <Link
                  to={"/signup"}
                  className="font-thin bg-[rgb(206,225,122)] hover:bg-[rgb(159,172,104)] text-black hover:text-lime-900 font-mono px-4 py-5 h-full flex items-center transition duration-300 ease-in-out"
                >
                  GET STARTED
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

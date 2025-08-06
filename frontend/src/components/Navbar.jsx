import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  LogOutIcon,
  ShoppingCart,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[rgba(245,235,220,1)] backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-none">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-wrap justify-between h-full tracking-wide">
          <Link
            to="/"
            className="text-3xl font-thin tracking-tighter text-black items-center space-x-2 flex hover:scale-110 hover:text-fuchsia-600 transition duration-300 ease-in-out"
          >
            {/* <span className="font-serif mr-3">JS </span>  */}
            JetStore
          </Link>
          <nav className="flex flex-wrap items-center gap-14">
            <Link
              to={"/"}
              className="font-thin hover:font-normal text-black hover hover:text-lime-600 hover:scale-125 transition duration-300 ease-in-out"
            >
              HOME
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group font-thin text-black hover hover:text-lime-600 hover:scale-125 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 font-thin hover:font-normal transition-all duration-300 ease-in-out group-hover:text-lime-600"
                  size={20}
                />
                <span className="hidden sm:inline font-thin hover:font-normal transition-all duration-300 ease-in-out">
                  CART
                </span>
                <span className="absolute -top-2 -left-2 bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs group-hover:bg-yellow-500 transition duration-300 ease-in-out">
                  {/* {cart.length} */}3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                className="text-black hover:text-lime-600 hover:scale-125 font-thin px-3 py-1 rounded-md transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                {/* <LayoutDashboard className="inline-block mr-1" size={25} /> */}
                <span className="hidden sm:inline font-thin hover:font-normal transition-all duration-300 ease-in-out">
                  DASHBOARD
                </span>
              </Link>
            )}
            {user ? (
              <div className="flex items-center h-full relative group cursor-pointer">
                <button
                  className="bg-[rgb(206,225,122)] hover:bg-[rgb(206,225,122)] text-black hover:text-lime-900 border-transparent hover:border-b-2 hover:border-b-fuchsia-500 font-thin px-4 py-2 h-full flex items-center transition duration-300 ease-in-out"
                  onClick={logout}
                >
                  {/* CircleUser - Hide on hover */}
                  <CircleUser
                    className="h-10 w-10 text-gray-700 transition-opacity group-hover:opacity-0 hover:font-normal duration-300 ease-in-out"
                    strokeWidth={1}
                  />

                  {/* LogOut - Show on hover */}
                  <LogOut
                    className="absolute top-3 left-4 h-10 w-10 text-gray-700 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
                    strokeWidth={1}
                    title="Logout"
                  />
                  {/* <span className="hidden sm:inline ml-2">LOG OUT</span> */}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 h-full ">
                <Link
                  to={"/login"}
                  className="font-thin hover:font-normal hover:text-white border-transparent hover:border-b-4 hover:border-b-fuchsia-600 transition-all duration-300 ease-in-out bg-[rgb(206,225,122)] hover:bg-[rgb(159,172,104)] text-black hover:scale-110  px-4 py-2 h-full flex items-center"
                >
                  SIGN IN
                </Link>
                <Link
                  to={"/signup"}
                  className="font-thin hover:font-normal hover:text-white border-transparent hover:border-b-4 hover:border-b-fuchsia-600 transition-all duration-300 ease-in-out bg-[rgb(206,225,122)] hover:bg-[rgb(159,172,104)] text-black hover:scale-110 px-4 py-2 h-full flex items-center"
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

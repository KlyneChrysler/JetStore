import { useState } from "react";
import waveBackground from "../assets/sign_in_wave.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader, Lock, Mail, User, UserPlus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <div
      className="w-full min-h-screen overflow-y-auto bg-cover bg-[rgba(250,245,235,1)] bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${waveBackground})` }}
    >
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="flex flex-col items-center">
          <h2 className="mt-24 text-center text-3xl font-thin tracking-widest text-black">
            {/* <img
              src="../src/assets/jetstore_logo_nobg.png"
              alt=""
              width={50}
              className="ml-3 mb-5"
            /> */}
            Sign in
          </h2>
        </div>
      </motion.div>
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-black/20 mb-24">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-1xl font-thin text-black"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-slate-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm text-black"
                  placeholder="Enter your email address"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-1xl font-thin text-black"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-slate-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm text-black"
                  placeholder="Enter your password"
                ></input>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 text-justify leading-snug"
              >
                By signing in, you agree to our{" "}
                <a
                  href="https://www.termsfeed.com/live/9447fef1-85c5-40f9-8d58-d557899c3f83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="https://www.termsfeed.com/live/c3527b20-3634-40ba-a660-40954b9bb2cd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[rgba(0,139,139,1)] hover:bg-[rgba(0,255,255,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[rgba(0,255,255,1)] transition duration-150 ease-in-out disabled:opacity-50"
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
                  {/* <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" /> */}
                  Login
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-1xl font-thin text-black">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-thin text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

import { Facebook, Github, Linkedin, Mail } from "lucide-react";

// TODO
const Footer = () => {
  return (
    <div className="bg-cyan-900 py-8">
      <div className="flex items-start justify-evenly px-4 py-16 text-white sm:flex-col md:flex-row gap-5 ">
        <div className="font-thin text-2xl pr-32">
          <div className="flex items-center gap-2">
            <img
              src="../src/assets/jetstore_logo_nobg.png"
              alt="JetStore Logo"
              width={40}
              height={25}
              className="hover:scale-125 transition-transform duration-300 ease-in-out"
            />
            <span className="hover:tracking-wide transition-all duration-300 ease-in-out">
              JetStore
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-thin mt-2">
              Built to Bloom, Just for You.
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <a
                  href="https://github.com/KlyneChrysler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fuchsia-300 transition-colors duration-300"
                >
                  <Github />
                </a>
              </div>
              <div>
                <a
                  href="mailto:klynechrislu@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fuchsia-300 transition-colors duration-300"
                >
                  <Mail />
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/klyne-chrysler-b60875287/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fuchsia-300 transition-colors duration-300"
                >
                  <Linkedin />
                </a>
              </div>
              <div>
                <a
                  href="https://web.facebook.com/kccd11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fuchsia-300 transition-colors duration-300"
                >
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="tracking-widest">
          <div className="flex flex-col gap-4 items-start justify-start">
            <span>PRODUCT</span>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Bundles
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Reviews
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Pricing
            </div>
          </div>
        </div>
        <div className="tracking-widest">
          <div className="flex flex-col gap-4 items-start justify-start">
            <span>COMPANY</span>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              About Us
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Blog
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Contact
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Terms of Service
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Privacy Policy
            </div>
          </div>
        </div>
        <div className="tracking-widest">
          <div className="flex flex-col gap-4 items-start justify-start">
            <span>CONNECT</span>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Contact
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Upcoming Events
            </div>
            <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
              Community
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-36  ">
        <div className="border border-b border-gray-500/30 rounded-md w-full"></div>
      </div>
      <div className="flex justify-between px-36 pt-8 text-white tracking-widest">
        <div className=" text-sm font-thin hover:text-gray-500 transition-colors duration-300">
          © 2025 Klyne, Co. All rights reserved.
        </div>
        <div className="text-sm font-thin hover:text-gray-500 transition-colors duration-300">
          Jet Co.
        </div>
      </div>
    </div>
  );
};
export default Footer;

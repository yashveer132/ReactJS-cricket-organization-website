import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", text: "Home" },
  { to: "/register", text: "Register" },
  { to: "/tournaments", text: "Tournaments" },
  { to: "/training", text: "Trainings" },
  { to: "/jobs", text: "Jobs" },
  { to: "/gallery", text: "Gallery" },
  { to: "/players", text: "Top Players" },
  { to: "/shop", text: "Shop" },
  { to: "/blog", text: "Blogs" },
  { to: "/contact", text: "Contact" },
  { to: "/about", text: "About Us" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 xl:px-8 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            className="text-xl sm:text-2xl font-bold truncate"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            XYZ Organization
          </motion.div>

          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
              {navItems.map((item) => (
                <motion.li
                  key={item.to}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className="block hover:text-green-200 py-2 lg:py-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

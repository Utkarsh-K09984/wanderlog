import { Link } from "react-router-dom";
import ThemeToggle from "./themetoggle";
import { useState } from "react";
import { Menu, User2Icon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../lib/authStore";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state)=>state.user);

  return (
    <nav className="sticky top-0 w-full p-4 shadow-md flex items-center justify-between relative z-50 bg-black/10 backdrop-blur-md ">

      {/* Left: Logo */}
      <div className="flex items-center flex-1">
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          🌍 Travel Journal
        </Link>
      </div>

      {/* Center Nav Links (Desktop Only) */}
      <div className="hidden md:flex justify-center flex-1 gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Journal">Journal</Link>
        <Link to="/contactus">Contact Us</Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-end flex-1 gap-3">
        <ThemeToggle />
        {user ? (
          <Link to="/login" className="hidden md:inline font-medium">
            <User2Icon/>
          </Link>
        ) :
        (<Link to="/login" className="hidden md:inline font-medium">
          Login
        </Link>)
        }

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="absolute top-0 left-0 w-full h-screen bg-background z-50 flex flex-col items-center pt-6 px-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close Menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Menu Links */}
            <div className="mt-16 flex flex-col gap-6 text-lg items-center">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/Journal" onClick={() => setIsOpen(false)}>Journal</Link>
              <Link to="/contactus" onClick={() => setIsOpen(false)}>Contact Us</Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

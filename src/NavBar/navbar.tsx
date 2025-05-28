import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./themetoggle";
import { useAuthStore } from "../lib/authStore";
import type { User } from "firebase/auth";

function Navbar() {
  const user = useAuthStore((state) => state.user) as User | null;

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 shadow-md w-full">
      {/* Logo on the left */}
      <div className="flex-1 min-w-[150px]">
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          🌍 Travel Journal
        </Link>
      </div>
      {/* Center navigation */}
      <div className="flex-1 flex justify-center gap-4 md:gap-8 flex-wrap min-w-[200px]">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Journal">Journal</Link>
        <Link to="/contactus">Contact Us</Link>
      </div>
      {/* Right side: theme toggle and login */}
      <div className="flex-1 flex justify-end items-center gap-2 md:gap-4 min-w-[150px]">
        <ThemeToggle />
        {user ? (
          <Link to="/login" className="font-medium">
            <img
              src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-primary object-cover"
            />
          </Link>
        ) : (
          <Link to="/login" className="font-medium">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="relative bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {isMenuOpen ? (
          <X
            className="w-6 h-6 text-[#0A58CA] cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-[#0A58CA] cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}

        <span className="text-xl font-bold text-[#0A58CA]">
          TaskFlow
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Profile Avatar Trigger */}
        <button
          onClick={() => navigate("/profile")}
          aria-label="User Profile"
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-sm transition-colors border border-slate-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0A58CA]"
        >
          {/* Default Avatar Fallback (Icon or Initials) */}
          <User className="w-5 h-5 text-slate-600" />
          
          {/* Alternatively, use initials:
          <span>TF</span> 
          */}

          {/* If you add an image later, replace the inner content with:
          <img src={userProfileUrl} alt="Profile" className="w-full h-full object-cover" /> 
          */}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-6 w-48 bg-white border rounded-lg shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Today
          </Link>

          <Link
            to="/tasks"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Tasks
          </Link>

          <Link
            to="/chat"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Chat
          </Link>

          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
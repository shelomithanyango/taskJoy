import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? "bg-blue-600" : "bg-blue-100"
          }`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          >
            <span className="text-[10px]">
              {isDarkMode ? "🌙" : "☀️"}
            </span>
          </div>
        </div>

        <Search className="w-5 h-5 text-slate-600 cursor-pointer" />
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
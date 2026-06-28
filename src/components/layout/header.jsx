import { useState } from "react";
import { Menu, Search } from "lucide-react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-[#0A58CA] cursor-pointer" />
        <span className="text-xl font-bold text-[#0A58CA]">
          TaskFlow
        </span>
      </div>

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
    </header>
  );
}

export default Header;
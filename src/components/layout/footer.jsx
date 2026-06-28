import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#eef2f7] border-t border-slate-200/60 px-8 py-3 flex justify-around items-center z-30 shadow-md">

      {/* TODAY */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center py-1 min-w-16 ${
          isActive("/") ? "text-[#0052cc]" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <div
          className={`w-12 h-7 rounded-full flex items-center justify-center mb-0.5 ${
            isActive("/") ? "bg-[#bfdbfe]" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        </div>
        <span className="text-[11px] font-bold">Today</span>
      </Link>

      {/* TASKS */}
      <Link
        to="/tasks"
        className={`flex flex-col items-center justify-center py-1 min-w-16 ${
          isActive("/tasks")
            ? "text-[#0052cc]"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mb-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.5 4.5 0 112.83 0M15 7.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 7.5v10.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V7.5z"
          />
        </svg>
        <span className="text-[11px] font-bold">Tasks</span>
      </Link>

      {/* ASSISTANT */}
      <Link
        to="/chat"
        className={`flex flex-col items-center justify-center py-1 min-w-16 ${
          isActive("/chat")
            ? "text-[#0052cc]"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mb-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 11.995 11.995 0 011.667-3.834C4.466 15.07 4 13.585 4 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
        <span className="text-[11px] font-bold">Assistant</span>
      </Link>

      {/* PROFILE */}
      <Link
        to="/profile"
        className={`flex flex-col items-center justify-center py-1 min-w-16 ${
          isActive("/profile")
            ? "text-[#0052cc]"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mb-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <span className="text-[11px] font-bold">Profile</span>
      </Link>

    </footer>
  );
}

export default Footer;
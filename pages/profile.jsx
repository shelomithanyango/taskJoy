import React, { useState } from 'react';
import { 
  Menu, Search, Pencil, TrendingUp, User, Bell, 
  ShieldCheck, HelpCircle, LogOut, Calendar, CheckSquare, Bot 
} from 'lucide-react';

export default function Profile() {
  // --- DATA ---
  const userData = {
    profileImage: "", 
    name: "Insert Name",
    role: "Insert Role / Title",
    planType: "PRO PLAN",
    estYear: "EST. 2026",
    email: "user@example.com",
    
    // Productivity Stats
    tasksCompleted: 0,
    productivityScore: 0, 
    performanceComparisonText: "You're performing 0% better than last month!",
    
    // Menu Subtitles
    accountSubtitle: "Security, passwords, and data",
    notificationsSubtitle: "Alerts, sounds, and push sync",
    privacySubtitle: "Permissions and third-party apps",
    helpSubtitle: "FAQs, chat, and documentation"
  };

  // --- STATE ---
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="w-full min-h-screen bg-[#F4F7FC] flex flex-col text-slate-800 font-sans">
      
      {/* --- HEADER --- */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-[#0A58CA] cursor-pointer" />
          <span className="text-xl font-bold text-[#0A58CA]">TaskFlow</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Toggle Switch */}
          <div 
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}>
              <span className="text-[10px]">{isDarkMode ? '🌙' : '☀️'}</span>
            </div>
          </div>
          <Search className="w-5 h-5 text-slate-600 cursor-pointer" />
        </div>
      </header>

      {/* --- SCROLLABLE CONTENT --- */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 space-y-6 pb-28">
        
        {/* Responsive Layout Grid for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full">
            <div className="relative w-28 h-28 mx-auto mb-4">
              {userData.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-full border-4 border-white shadow-md bg-slate-200 flex items-center justify-center text-slate-400">
                  <User className="w-10 h-10" />
                </div>
              )}
              <button className="absolute bottom-1 right-1 bg-[#0A58CA] text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-[#062447]">{userData.name || "No Name"}</h2>
            <p className="text-slate-500 text-sm font-medium mt-0.5">{userData.role || "No Role Selected"}</p>
            
            <div className="flex justify-center gap-2 mt-4">
              {userData.planType && (
                <span className="bg-[#6C8DFF]/20 text-[#0A58CA] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                  {userData.planType}
                </span>
              )}
              {userData.estYear && (
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                  {userData.estYear}
                </span>
              )}
            </div>
          </div>

          {/* Productivity Snapshot Card */}
          <div className="bg-gradient-to-br from-[#061E3D] to-[#0B2E5C] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between md:col-span-2">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold tracking-wide text-slate-200">Productivity Snapshot</h3>
                <TrendingUp className="w-5 h-5 text-slate-300" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-5xl font-extrabold tracking-tight">{userData.tasksCompleted}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Tasks Completed</p>
                </div>
                <div>
                  <p className="text-5xl font-extrabold tracking-tight">
                    {userData.productivityScore}
                    <span className="text-2xl font-semibold">%</span>
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Productivity Score</p>
                </div>
              </div>
            </div>

            <div>
              {/* Progress Bar Container */}
              <div className="w-full bg-[#1A3A63] h-2.5 rounded-full overflow-hidden mb-4">
                <div 
                  className="bg-[#1877F2] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(Math.max(userData.productivityScore, 0), 100)}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 font-light">
                {userData.performanceComparisonText}
              </p>
            </div>
          </div>

        </div>

        {/* --- NAVIGATION LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account */}
          <button className="w-full bg-white flex items-center justify-between p-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-left border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#0A58CA]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Account</h4>
                <p className="text-xs text-slate-500 mt-0.5">{userData.accountSubtitle}</p>
              </div>
            </div>
            <span className="text-slate-400 font-semibold text-lg">&gt;</span>
          </button>

          {/* Notifications */}
          <button className="w-full bg-white flex items-center justify-between p-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-left border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#0A58CA]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                <p className="text-xs text-slate-500 mt-0.5">{userData.notificationsSubtitle}</p>
              </div>
            </div>
            <span className="text-slate-400 font-semibold text-lg">&gt;</span>
          </button>

          {/* Privacy */}
          <button className="w-full bg-white flex items-center justify-between p-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-left border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#0A58CA]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Privacy</h4>
                <p className="text-xs text-slate-500 mt-0.5">{userData.privacySubtitle}</p>
              </div>
            </div>
            <span className="text-slate-400 font-semibold text-lg">&gt;</span>
          </button>

          {/* Help & Support */}
          <button className="w-full bg-white flex items-center justify-between p-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-left border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2.5 rounded-xl text-[#0A58CA]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Help & Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">{userData.helpSubtitle}</p>
              </div>
            </div>
            <span className="text-slate-400 font-semibold text-lg">&gt;</span>
          </button>
        </div>

        {/* --- LOG OUT BUTTON --- */}
        <div className="pt-4">
          <button className="w-full border-t border-slate-200 pt-5 pb-2 flex items-center justify-center gap-2 text-rose-600 font-semibold text-sm hover:text-rose-700 transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Log Out {userData.email}</span>
          </button>
        </div>

      </main>

      {/* --- BOTTOM TAB NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#E9F0FA] px-8 py-3 flex justify-around items-center border-t border-slate-200/60 z-30 shadow-md">
        
        <button 
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center gap-1 min-w-16 transition-colors ${activeTab === 'today' ? 'text-[#0A58CA]' : 'text-slate-500'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[11px] font-medium">Today</span>
        </button>

        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 min-w-16 transition-colors ${activeTab === 'tasks' ? 'text-[#0A58CA]' : 'text-slate-500'}`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[11px] font-medium">Tasks</span>
        </button>

        <button 
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center gap-1 min-w-16 transition-colors ${activeTab === 'assistant' ? 'text-[#0A58CA]' : 'text-slate-500'}`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[11px] font-medium">Assistant</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 min-w-16 relative transition-colors ${activeTab === 'profile' ? 'text-[#0A58CA]' : 'text-slate-500'}`}
        >
          {activeTab === 'profile' && (
            <div className="absolute -inset-x-3 -inset-y-1.5 bg-[#6C8DFF]/20 rounded-xl -z-10"></div>
          )}
          <User className="w-5 h-5" />
          <span className={`text-[11px] ${activeTab === 'profile' ? 'font-bold' : 'font-medium'}`}>Profile</span>
        </button>

      </nav>
    </div>
  );
}
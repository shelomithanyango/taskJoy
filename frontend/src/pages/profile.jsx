import React, { useState, useRef } from 'react';
import { 
  Menu, Search, Pencil, TrendingUp, User, Bell, 
  ShieldCheck, HelpCircle, LogOut, Calendar, CheckSquare, Bot, X, Check
} from 'lucide-react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function Profile() {
  // --- STATE FOR EDITABLE USER DATA ---
  const [profile, setProfile] = useState({
    profileImage: "", 
    name: "Insert Name",
    role: "Insert Role / Title",
  });

  // --- STATS & SUBTITLES ---
  const userData = {
    tasksCompleted: 0,
    productivityScore: 0, 
    performanceComparisonText: "You're performing 0% better than last month!",
    accountSubtitle: "Security, passwords, and data",
    notificationsSubtitle: "Alerts, sounds, and push sync",
    privacySubtitle: "Permissions and third-party apps",
    helpSubtitle: "FAQs, chat, and documentation"
  };

  // --- MODAL & INPUT REFS ---
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempRole, setTempRole] = useState(profile.role);
  const fileInputRef = useRef(null);

  // Trigger hidden file picker
  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Upload & set new profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  // Save Name/Role changes from Modal
  const handleSaveModal = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: tempName,
      role: tempRole
    }));
    setIsEditingModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F7FC] flex flex-col text-slate-800 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 space-y-6 pb-28">
        
        {/* Hidden File Input for Image Upload */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full relative">
            
            {/* AVATAR + PENCIL BUTTON */}
            <div className="relative w-28 h-28 mx-auto mb-4">
              {profile.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-full h-full rounded-full border-4 border-white shadow-md bg-slate-200 flex items-center justify-center text-slate-400">
                  <User className="w-10 h-10" />
                </div>
              )}

              {/* Functional Pencil Icon (Triggers File Picker) */}
              <button 
                onClick={handlePencilClick}
                title="Change Profile Picture"
                className="absolute bottom-1 right-1 bg-[#0A58CA] text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-[#062447]">{profile.name || "No Name"}</h2>
            <p className="text-slate-500 text-sm font-medium mt-0.5">{profile.role || "No Role Selected"}</p>
            
            {/* Edit Text Button */}
            <button 
              onClick={() => setIsEditingModalOpen(true)}
              className="mt-4 text-xs font-semibold text-[#0A58CA] hover:underline"
            >
              Edit Details
            </button>
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

      </main>

      {/* --- EDIT PROFILE MODAL --- */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Edit Profile</h3>
              <button 
                onClick={() => setIsEditingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Role / Title</label>
                <input 
                  type="text" 
                  value={tempRole}
                  onChange={(e) => setTempRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0A58CA]"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0A58CA] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
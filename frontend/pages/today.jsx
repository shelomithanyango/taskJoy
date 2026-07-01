import React, { useState } from 'react';

export default function Today() {
  // Input section states (starts empty, ready for fresh entries)
  const [titleInput, setTitleInput] = useState('');
  const [timeBlockInput, setTimeBlockInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  // Tasks list array starts completely empty
  const [tasks, setTasks] = useState([]);

  // Handler to validation-check fields and append the custom task entry
  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!titleInput.trim() || !timeInput.trim() || !timeBlockInput || !priorityInput || !categoryInput) {
      alert("Please fill out all task parameters before appending to your overview feed.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: titleInput,
      timeBlock: timeBlockInput, 
      time: timeInput,           
      tags: [
        { text: priorityInput, type: priorityInput.includes('HIGH') ? 'high' : 'low' }, 
        { text: categoryInput, type: 'category' }
      ],
      completed: false,
    };

    setTasks([...tasks, newTask]);
    
    // Reset variables to wait for subsequent values
    setTitleInput('');
    setTimeBlockInput('');
    setTimeInput('');
    setPriorityInput('');
    setCategoryInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="w-full min-h-screen bg-[#f7f9fc] flex flex-col font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="text-slate-600 hover:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl font-bold text-[#0052cc] tracking-tight">TaskFlow</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <button className="hover:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.603Z" />
            </svg>
          </button>
          <button className="hover:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06m-9.193 9.193l-1.06 1.06m12.728 0l-1.06-1.06M6.343 6.343l-1.06-1.06M14.25 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT SPACE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 space-y-6 pb-28">
        
        {/* DAILY OVERVIEW TITLE HERO SECTION */}
        <section>
          <span className="text-[11px] font-extrabold text-[#0052cc] tracking-wider uppercase block mb-1">
            Daily Overview
          </span>
          <h1 className="text-3xl font-black text-slate-950 mb-3">
            June 28, 2026
          </h1>
          <div className="inline-flex items-center gap-2 bg-[#e8f0fe] text-[#0052cc] px-3 py-1.5 rounded-full text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <span>{completedCount}/{tasks.length} tasks completed</span>
          </div>
        </section>

        {/* RE-INTEGRATED DYNAMIC DATA PANEL INPUT FORM */}
        <form onSubmit={handleAddTask} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-700">Create Daily Task</h3>
          
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="What is the task? (e.g., Review marketing deck)"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Schedule Block */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Schedule</label>
              <select 
                value={timeBlockInput} 
                onChange={(e) => setTimeBlockInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled hidden>Select period...</option>
                <option value="MORNING">Morning</option>
                <option value="AFTERNOON">Afternoon</option>
                <option value="EVENING">Evening</option>
              </select>
            </div>

            {/* Exact Time String */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Time</label>
              <input 
                type="text" 
                value={timeInput} 
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="e.g., 10:00 AM" 
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Priority Select */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Priority</label>
              <select 
                value={priorityInput} 
                onChange={(e) => setPriorityInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled hidden>Select level...</option>
                <option value="HIGH PRIORITY">High Priority</option>
                <option value="MEDIUM PRIORITY">Medium Priority</option>
                <option value="LOW PRIORITY">Low Priority</option>
              </select>
            </div>

            {/* Category Option Labels */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
              <select 
                value={categoryInput} 
                onChange={(e) => setCategoryInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled hidden>Select label...</option>
                <option value="WORK">Work</option>
                <option value="STUDY">Study</option>
                <option value="PERSONAL">Personal</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full mt-1 py-3 bg-[#0052cc] text-white text-sm font-bold rounded-xl hover:bg-[#0041a3] transition-colors shadow-md">
            Add to Overview
          </button>
        </form>

        {/* FEED DISPLAY TRACK */}
        <section className="flex flex-col gap-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white px-4 text-slate-400 text-sm">
              Your schedule is completely empty. Fill out the creation board setup fields above to see daily tasks appear here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between gap-3 relative transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e8f0fe] text-[#0052cc]">
                      {task.timeBlock}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {task.time}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <button 
                      type="button" 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                        task.completed 
                          ? 'bg-[#0052cc] border-[#0052cc] text-white' 
                          : 'border-slate-300 bg-white hover:border-[#0052cc]'
                      }`}
                    >
                      {task.completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </button>

                    <div className="flex flex-col gap-2">
                      <span className={`text-base font-bold text-slate-900 transition-all ${task.completed ? 'line-through text-slate-400 opacity-70' : ''}`}>
                        {task.title}
                      </span>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {task.tags.map((tag, idx) => {
                          let tagStyle = "bg-slate-100 text-slate-600";
                          if (tag.type === 'high') tagStyle = "bg-[#fde8e8] text-[#c01e1e]";
                          if (tag.type === 'category' || tag.type === 'low') tagStyle = "bg-[#e8f0fe] text-[#0052cc]";
                          
                          return (
                            <span key={idx} className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide ${tagStyle}`}>
                              {tag.text}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPLEMENTARY STATS DESIGN BANNER */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-5 text-white shadow-md min-h-[90px]">
          <h2 className="text-xl font-bold tracking-wide mt-2">Stay Focused</h2>
        </div>
      </main>

      {/* BOTTOM CONTROL GRID NAVIGATION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#eef2f7] border-t border-slate-200/60 px-8 py-3 flex justify-around items-center z-30 shadow-md">
        <button className="flex flex-col items-center justify-center py-1 text-[#0052cc] min-w-16">
          <div className="w-12 h-7 bg-[#bfdbfe] rounded-full flex items-center justify-center mb-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <span className="text-[11px] font-bold">Today</span>
        </button>

        <button className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 min-w-16">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 2.24a4.5 4.5 0 112.83 0M15 7.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 7.5v10.5a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V7.5z" />
          </svg>
          <span className="text-[11px] font-bold">Tasks</span>
        </button>

        <button className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 min-w-16">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 11.995 11.995 0 011.667-3.834C4.466 15.07 4 13.585 4 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="text-[11px] font-bold">Assistant</span>
        </button>

        <button className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 min-w-16">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mb-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="text-[11px] font-bold">Profile</span>
        </button>
      </footer>

    </div>
  );
}
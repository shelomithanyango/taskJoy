import React, { useState } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";


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
    <Header />

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

      {/* BOTTOM CONTROL/NAV */}
     
<Footer />
    </div>
  );
}
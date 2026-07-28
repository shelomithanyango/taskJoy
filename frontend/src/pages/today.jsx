import React, { useState, useEffect } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
// Import your API service handler (adjust path as needed)
import { fetchTasks } from '../api'; 

export default function Today() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend on load
  useEffect(() => {
    loadTasks();
  }, []);

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const loadTasks = () => {
    fetchTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching today's tasks:", error));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="w-full min-h-screen bg-[#F4F6FB] flex flex-col font-sans text-slate-800">
      
      {/* HEADER */}
      <Header />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-6 py-6 space-y-6 pb-28">
        
        {/* HERO TITLE SECTION */}
        <section className="flex flex-col gap-1">
          <span className="text-[11px] font-extrabold text-[#1D4ED8] tracking-wider uppercase block">
            Daily Overview
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            {currentDateFormatted}
          </h1>
          <div className="mt-1 inline-flex items-center gap-2 bg-[#E8EEFF] text-[#1D4ED8] px-3 py-1.5 rounded-full text-xs font-bold w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{completedCount}/{tasks.length} tasks completed</span>
          </div>
        </section>

        {/* FETCHED TASKS FEED */}
        <section className="flex flex-col gap-3.5">
          {tasks.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white px-4 text-slate-400 text-xs">
              No tasks found for today.
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3 relative transition-all"
              >
                {/* Header Time block and Timestamp */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-[#E8EEFF] text-[#1D4ED8] tracking-wider uppercase">
                    {task.timeBlock || task.time_block || 'MORNING'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {task.time || '10:00 AM'}
                  </span>
                </div>

                {/* Main Task Row */}
                <div className="flex items-start gap-3">
                  <button 
                    type="button" 
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      task.completed 
                        ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' 
                        : 'border-slate-300 bg-white hover:border-[#1D4ED8]'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </button>

                  <div className="flex flex-col gap-2">
                    <span className={`text-base font-bold text-slate-900 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.title || task.description}
                    </span>
                    
                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {task.priority && (
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                          task.priority.toLowerCase().includes('high') 
                            ? 'bg-[#FFEBEB] text-[#E53E3E]' 
                            : 'bg-[#E8EEFF] text-[#1D4ED8]'
                        }`}>
                          {task.priority}
                        </span>
                      )}
                      
                      {task.category && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-[#E8EEFF] text-[#1D4ED8] uppercase tracking-wider">
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* MOTIVATIONAL BANNER */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1D4ED8] p-6 shadow-md min-h-[110px] flex items-end">
  {/* Dark blue diagonal overlay matching the screenshot's gradient geometry */}
  <div 
    className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A] via-[#2563EB]/80 to-[#1D4ED8] opacity-90"
  />

  {/* Subtle abstract background geometry accents */}
  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 transform -skew-x-12 translate-x-6" />
  <div className="absolute bottom-0 right-10 w-1/3 h-3/4 bg-slate-980/20 transform skew-x-6" />

  {/* Banner Text */}
  <h2 className="relative z-10 text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-sm">
    Stay Focused
  </h2>
</div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
import React, { useState } from 'react';

export default function Tasks() {
  // 1. STATE FOR DATA STORAGE
  const [tasks, setTasks] = useState([]); // Starts completely empty
  const [taskInput, setTaskInput] = useState(''); // Tracks what the user types
  
  // Navigation & Filter States
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Tasks');

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  // 2. FUNCTION TO ADD A NEW TASK
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    if (!taskInput.trim()) return; // Don't add empty tasks

    const newTask = {
      id: Date.now(), // Unique ID using timestamps
      title: taskInput,
      category: 'General', // Default category badge
      priority: 'Medium Priority', // Default priority badge
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      completed: false
    };

    setTasks([...tasks, newTask]); // Appends new task to the array state
    setTaskInput(''); // Clears the input field automatically
  };

  // 3. FUNCTION TO TOGGLE CHECKBOX (COMPLETE/INCOMPLETE)
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 4. FUNCTION TO FILTER DISPLAYED TASKS
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'To Do') return !task.completed;
    if (activeFilter === 'Done') return task.completed;
    return true; // 'All' show everything
  });

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans relative">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-blue-600 tracking-tight">TaskFlow</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 py-6 pb-32 max-w-3xl mx-auto w-full">
        
        {/* INPUT FORM (Key in tasks directly here) */}
        <form onSubmit={handleAddTask} className="mb-8 flex gap-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Type a new task and press Enter..."
            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder-slate-400 shadow-sm transition-colors"
          />
          <button 
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
          >
            Add
          </button>
        </form>

        {/* FILTER CHIPS */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'bg-blue-50 text-slate-600 hover:bg-blue-100/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* TASK FEED CONTAINER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Your Tasks</h2>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
            Total: {filteredTasks.length}
          </span>
        </div>

        {/* DYNAMIC TASK LIST / EMPTY STATE */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            // Shown when list is blank
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 font-medium">No tasks found. Add a task above to get started!</p>
            </div>
          ) : (
            // Maps user input into active elements
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`bg-white border rounded-2xl p-4 flex items-start gap-4 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] transition-all ${
                  task.completed ? 'border-slate-100 opacity-60' : 'border-slate-100 hover:border-blue-200'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer border-2"
                />
                
                <div className="flex-1">
                  <h3 className={`font-semibold text-slate-800 text-base leading-tight mb-1.5 ${
                    task.completed ? 'line-through text-slate-400' : ''
                  }`}>
                    {task.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 items-center mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {task.category}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-50 text-slate-500 rounded text-xs font-medium">
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <span>Added: {task.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex items-center justify-between z-10">
        <button onClick={() => setActiveTab('Today')} className="flex flex-col items-center gap-1 flex-1 py-1">
          <svg className={`w-6 h-6 ${activeTab === 'Today' ? 'text-blue-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`text-[11px] font-medium ${activeTab === 'Today' ? 'text-blue-600' : 'text-slate-400'}`}>Today</span>
        </button>

        <button onClick={() => setActiveTab('Tasks')} className="flex flex-col items-center flex-1">
          <div className="bg-blue-100/70 px-5 py-1.5 rounded-full flex flex-col items-center gap-0.5">
            <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] font-bold text-blue-800">Tasks</span>
          </div>
        </button>

        <button onClick={() => setActiveTab('Assistant')} className="flex flex-col items-center flex-1 py-1">
          <div className="border-2 border-dashed border-blue-400 p-1 rounded flex flex-col items-center gap-1 min-w-[64px]">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-[11px] font-medium text-slate-600">Assistant</span>
          </div>
        </button>

        <button onClick={() => setActiveTab('Profile')} className="flex flex-col items-center flex-1 py-1">
          <div className="border-2 border-dashed border-blue-400 p-1 rounded flex flex-col items-center gap-1 min-w-[64px]">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[11px] font-medium text-slate-600">Profile</span>
          </div>
        </button>
      </nav>
    </div>
  );
}
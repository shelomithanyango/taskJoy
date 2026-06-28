import React, { useState } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

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
     <Header />
      

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
   <Footer />
    </div>
  );
}
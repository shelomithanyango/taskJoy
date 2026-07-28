import React, { useState, useEffect } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
// Import the API service handlers
import { fetchTasks, createTask, updateTask } from '../api';

export default function Tasks() {
  // 1. STATE FOR DATA STORAGE
  const [tasks, setTasks] = useState([]); // Will hold the array from Django database
  const [taskInput, setTaskInput] = useState(''); // Tracks what the user types
  
  // Custom Dynamic Input States for Payload Selections
  const [taskCategory, setTaskCategory] = useState('Work');
  const [taskPriority, setTaskPriority] = useState('High');

  // Navigation & Filter States
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Tasks');
  const [showAddModal, setShowAddModal] = useState(false); // Controls modern addition modal/state toggle

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  // 2. FETCH DATA FROM DJANGO ON REFRESH/LOAD
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    fetchTasks()
      .then((response) => {
        setTasks(response.data); // Stores the network response array directly into state
      })
      .catch((error) => console.error("Error connecting to backend database:", error));
  };

  // 3. FUNCTION TO POST A NEW TASK TO DJANGO
  const handleAddTask = (e) => {
    e.preventDefault(); 
    if (!taskInput.trim()) return; 

    // Structure this payload object exactly how your backend models.py requires it
    const apiPayload = {
      description: taskInput,
      category: taskCategory,
      priority: taskPriority.toLowerCase(), // Dynamic lowercased choice string matching Django constraints
      status: 'todo',
      created_at: new Date().toISOString() // Dynamic real-time date generator
    };

    createTask(apiPayload)
      .then(() => {
        setTaskInput(''); // Clears the input field automatically
        setTaskCategory('Work'); // Reset to intuitive defaults
        setTaskPriority('High');
        setShowAddModal(false); // Close addition context
        loadTasks(); // Pulls the clean updated database entries down
      })
      .catch((error) => console.error("Could not post task payload:", error));
  };

  // 4. FUNCTION TO TOGGLE STATUS (TODO vs DONE) ON THE BACKEND
  const toggleTaskCompletion = (task) => {
    // Determine the next status string transition
    const updatedStatus = task.status === 'done' ? 'todo' : 'done';

    const updatedPayload = {
      ...task,
      status: updatedStatus
    };

    updateTask(task.id, updatedPayload)
      .then(() => {
        loadTasks(); // Refresh the list from the database
      })
      .catch((error) => console.error("Could not update task status:", error));
  };

  // 5. FUNCTION TO FILTER DISPLAYED TASKS
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'To Do') return task.status === 'todo';
    if (activeFilter === 'In Progress') return task.status === 'in_progress';
    if (activeFilter === 'Done') return task.status === 'done';
    return true; // 'All' shows everything
  });

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans relative">
      
      {/* RETAINED CUSTOM HEADER IMPORT */}
      <Header />

      {/* MAIN CONTENT AREA - SPREADS ACROSS NATURAL WIDTH */}
      <main className="flex-1 px-6 py-6 pb-36 w-full">
        
        {/* FILTER CHIPS */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[#005ec4] text-white shadow-md shadow-blue-100'
                  : 'bg-[#e2ecf9] text-[#4b5563] hover:bg-blue-100/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* FEED TITLE SUMMARY */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Recent Tasks</h2>
          <button className="text-xs font-bold text-[#005ec4] hover:underline">
            View Calendar
          </button>
        </div>

        {/* DYNAMIC INLINE TASK INJECTOR WITH FULL SELECT INPUT OPTIONS */}
        {showAddModal && (
          <form onSubmit={handleAddTask} className="mb-6 bg-white border-2 border-[#005ec4] rounded-2xl p-5 shadow-sm w-full transition-all">
            <div className="mb-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Task Title</label>
              <input
                type="text"
                autoFocus
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#005ec4] text-slate-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                <select 
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-700 bg-white text-sm focus:outline-none focus:border-[#005ec4]"
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Personal">Personal</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Priority Level</label>
                <select 
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-700 bg-white text-sm focus:outline-none focus:border-[#005ec4]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-slate-500 font-semibold rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-[#005ec4] text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        {/* DYNAMIC TASK LIST / EMPTY STATE */}
        <div className="space-y-4 w-full">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl w-full">
              <p className="text-slate-400 font-medium">No tasks found. Click the + button below to start!</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'done';
              
              return (
                <div 
                  key={task.id} 
                  className={`bg-white border rounded-2xl p-5 flex items-start gap-4 w-full transition-all relative ${
                    isCompleted ? 'border-slate-100 opacity-60' : 'border-slate-100 hover:border-blue-200 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)]'
                  }`}
                >
                  {/* CHECKBOX */}
                  <div className="mt-1 flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={isCompleted}
                      onChange={() => toggleTaskCompletion(task)}
                      className="w-5 h-5 rounded-md border-slate-300 text-[#005ec4] focus:ring-[#005ec4] cursor-pointer border-2 transition-all"
                    />
                  </div>
                  
                  {/* DATA DETAILS */}
                  <div className="flex-1 pr-16">
                    <h3 className={`font-bold text-slate-800 text-base leading-tight mb-2 ${
                      isCompleted ? 'line-through text-slate-400' : ''
                    }`}>
                      {task.description}
                    </h3>
                    
                    {/* LABELS / BADGES */}
                    <div className="flex flex-wrap gap-2 items-center mb-2.5">
                      <span className="px-2.5 py-0.5 bg-[#e2ecf9] text-[#1d4ed8] rounded-md text-[11px] font-bold capitalize">
                        {task.category || 'General'}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#e2ecf9] text-[#1d4ed8] rounded-md text-[11px] font-bold capitalize">
                        {task.priority} Priority
                      </span>
                    </div>

                    {/* ALWAYS SHOWS CORRECT LIVE BACKEND OR CLIENT TIMESTAMP */}
                    <div className="text-xs font-semibold text-slate-400">
                      <span>Added: {new Date(task.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* ACTION CONTROLS (Edit / Delete) */}
                  <div className="absolute top-5 right-5 flex items-center gap-3.5 text-slate-400">
                    <button className="hover:text-slate-700 transition-colors" title="Edit Task">
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button className="hover:text-red-500 transition-colors" title="Delete Task">
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-1.5 14.5a2.25 2.25 0 01-2.244 2.077H8.244a2.25 2.25 0 01-2.244-2.077L4.5 8.25m15 0bacM9 11v6m4-6v6m1-10V4c0-.621-.504-1.125-1.125-1.125h-3.75C9.375 2.875 8.875 3.379 8.875 4v3.5M19.5 8.25h-15" />
                      </svg>
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </main>

      {/* FLOATING ACTION BUTTON - PERFECT CIRCLE CONFIGURATION */}
      <button 
        onClick={() => setShowAddModal(!showAddModal)}
        className="fixed bottom-24 right-6 w-14 h-14 aspect-square bg-[#005ec4] text-white rounded-full flex items-center justify-center text-3xl font-light shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-30 border-4 border-[#e2ecf9] border-dashed"
      >
        <span className="leading-none select-none pb-1">+</span>
      </button>

      {/* RETAINED CUSTOM FOOTER IMPORT */}
      <Footer />
    </div>
  );
}
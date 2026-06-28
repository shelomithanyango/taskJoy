import React, { useState } from 'react';

export default function Chat() {
  // state arrays start empty
  const [tasks, setTasks] = useState([]);
  
  // input tracking states
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Tasks');

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!titleInput.trim() || !categoryInput || !priorityInput || !dateInput) {
      alert("Please fill out all task details.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: titleInput,
      category: categoryInput,
      priority: priorityInput,
      date: dateInput,
      status: 'To Do', // Defaults new tasks to 'To Do'
    };

    setTasks([...tasks, newTask]);
    setTitleInput('');
    setCategoryInput('');
    setPriorityInput('');
    setDateInput('');
  };

  const handleStatusChange = (id, currentStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        // Toggle sample status loop for demonstration
        const nextStatus = currentStatus === 'To Do' ? 'In Progress' : currentStatus === 'In Progress' ? 'Done' : 'To Do';
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'All') return true;
    return task.status === activeFilter;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="bg-white flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">✓</div>
          <span className="text-2xl font-black text-blue-600 tracking-tight">TaskFlow</span>
        </div>
        <button className="text-slate-500 hover:text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </header>

      <main className="flex-1 px-4 py-6 pb-36 max-w-2xl mx-auto w-full flex flex-col gap-6">
        
        {/* INPUT PANEL */}
        <form onSubmit={handleAddTask} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="New task description..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
          <div className="grid grid-cols-3 gap-2">
            <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none">
              <option value="" disabled hidden>Category</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
            </select>
            <select value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold focus:outline-none">
              <option value="" disabled hidden>Priority</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
            <input type="text" value={dateInput} onChange={(e) => setDateInput(e.target.value)} placeholder="Oct 24, 2023" className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-center focus:outline-none" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700">
            Add Task
          </button>
        </form>

        {/* FILTER CHIPS */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === filter ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* FEED LIST */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-700">
            <span>Recent Tasks</span>
            <button className="text-blue-600 hover:underline text-xs">View Calendar 📅</button>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs">
              No tasks matched this criteria.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(task.id, task.status)}
                    className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center font-bold text-xs ${
                      task.status === 'Done' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {task.status === 'Done' && '✓'}
                  </button>
                  <div className="flex flex-col gap-1.5">
                    <span className={`font-bold text-slate-900 ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>{task.title}</span>
                    <div className="flex gap-1">
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">{task.category}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">{task.priority}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">📅 {task.date}</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50/50 px-2 py-1 rounded uppercase tracking-wider">{task.status}</span>
              </div>
            ))
          )}
        </div>
      </main>

      {/* FOOTER NAV */}
      {renderFooterNav(activeTab, setActiveTab)}
    </div>
  );
}
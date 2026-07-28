import React, { useState, useEffect } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
// Import the API service handlers
import { fetchTasks, createTask, updateTask } from '../api';

export default function Tasks() {
  // 1. STATE FOR DATA STORAGE
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  
  // Custom Dynamic Input States for Payload Selections
  const [taskCategory, setTaskCategory] = useState('Work');
  const [taskPriority, setTaskPriority] = useState('High');

  // Navigation & Filter States
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // CALENDAR STATES
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  // 2. FETCH DATA FROM DJANGO ON REFRESH/LOAD
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    fetchTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error connecting to backend database:", error));
  };

  // 3. FUNCTION TO POST A NEW TASK TO DJANGO
  const handleAddTask = (e) => {
    e.preventDefault(); 
    if (!taskInput.trim()) return; 

    const apiPayload = {
      description: taskInput,
      category: taskCategory,
      priority: taskPriority.toLowerCase(),
      status: 'todo',
      created_at: new Date().toISOString()
    };

    createTask(apiPayload)
      .then(() => {
        setTaskInput('');
        setTaskCategory('Work');
        setTaskPriority('High');
        setShowAddModal(false);
        loadTasks();
      })
      .catch((error) => console.error("Could not post task payload:", error));
  };

  // 4. FUNCTION TO TOGGLE STATUS (TODO vs DONE) ON THE BACKEND
  const toggleTaskCompletion = (task) => {
    const updatedStatus = task.status === 'done' ? 'todo' : 'done';

    const updatedPayload = {
      ...task,
      status: updatedStatus
    };

    updateTask(task.id, updatedPayload)
      .then(() => {
        loadTasks();
      })
      .catch((error) => console.error("Could not update task status:", error));
  };

  // Helper for priority icons
  const renderPriorityIcon = (priority) => {
    const p = (priority || '').toLowerCase();
    if (p === 'high') {
      return <span className="text-red-500 font-extrabold text-sm font-mono">!</span>;
    }
    if (p === 'medium') {
      return <span className="text-blue-500 text-xs tracking-tighter font-mono font-bold">⊂≡</span>;
    }
    return <span className="text-blue-400 font-bold text-xs font-mono font-sans">=</span>;
  };

  // 5. FUNCTION TO FILTER DISPLAYED TASKS
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'To Do') return task.status === 'todo';
    if (activeFilter === 'In Progress') return task.status === 'in_progress';
    if (activeFilter === 'Done') return task.status === 'done';
    return true;
  });

  // 6. CALENDAR GENERATION HELPERS
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const days = [];

    // Empty cells before start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && today.getDate() === day;
      
      // Count tasks created on this date
      const taskCountForDay = tasks.filter((t) => {
        const taskDate = new Date(t.created_at || Date.now());
        return (
          taskDate.getDate() === day &&
          taskDate.getMonth() === month &&
          taskDate.getFullYear() === year
        );
      }).length;

      days.push(
        <div
          key={day}
          className={`h-10 rounded-xl flex flex-col items-center justify-center relative text-xs font-semibold ${
            isToday
              ? 'bg-[#1D4ED8] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>{day}</span>
          {taskCountForDay > 0 && (
            <span
              className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                isToday ? 'bg-white' : 'bg-[#1D4ED8]'
              }`}
            />
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FB] flex flex-col font-sans text-slate-800 relative">
      
      {/* HEADER */}
      <Header />

      {/* MAIN CONTAINER */}
      <main className="flex-1 px-4 md:px-8 py-6 w-full max-w-3xl mx-auto flex flex-col gap-6 pb-36">
        
        {/* FILTER CHIPS */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-[#1D4ED8] text-white shadow-xs'
                  : 'bg-[#E4ECFF] text-slate-600 hover:bg-blue-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* FEED TITLE SUMMARY */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
          <span>Recent Tasks</span>
          {/* VIEW CALENDAR BUTTON */}
          <button 
            onClick={() => setShowCalendar(true)}
            className="text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Calendar</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* DYNAMIC TASK LIST / EMPTY STATE */}
        <div className="flex flex-col gap-3.5">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs">
              No tasks found. Click the + button below to add one!
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'done';
              
              return (
                <div 
                  key={task.id} 
                  className={`bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 transition-all ${
                    isCompleted ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* CHECKBOX */}
                    <button
                      type="button"
                      onClick={() => toggleTaskCompletion(task)}
                      className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted 
                          ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white' 
                          : 'border-slate-300 bg-white hover:border-blue-400'
                      }`}
                    >
                      {isCompleted && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    {/* CONTENT DETAILS */}
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <h3 className={`font-bold text-slate-900 text-sm md:text-base leading-tight truncate ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}>
                        {task.description}
                      </h3>
                      
                      {/* BADGES */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] bg-[#E8EEFF] text-[#1D4ED8] font-bold px-2.5 py-0.5 rounded-md capitalize">
                          {task.category || 'Work'}
                        </span>
                        <span className="text-[10px] bg-[#E8EEFF] text-[#1D4ED8] font-bold px-2.5 py-0.5 rounded-md capitalize">
                          {task.priority ? `${task.priority} Priority` : 'High Priority'}
                        </span>
                      </div>

                      {/* TIMESTAMP */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {new Date(task.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRIORITY SYMBOL & ACTIONS */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-6 flex items-center justify-center">
                      {renderPriorityIcon(task.priority)}
                    </div>
                    <button className="text-slate-400 hover:text-slate-700 transition-colors" title="Edit Task">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors" title="Delete Task">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      {/* FLOATING ACTION BUTTON */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-8 w-14 h-14 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-full flex items-center justify-center text-3xl font-light shadow-xl hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer"
        title="Add Task"
      >
        +
      </button>

      {/* CALENDAR MODAL */}
      {showCalendar && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md flex flex-col gap-4 border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">Task Calendar</h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm px-2 py-1 rounded-md"
              >
                ✕
              </button>
            </div>

            {/* Calendar Controls */}
            <div className="flex items-center justify-between px-2 py-1">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 font-bold"
              >
                ‹
              </button>
              <span className="text-sm font-bold text-slate-800">
                {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 font-bold"
              >
                ›
              </button>
            </div>

            {/* Day Names Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 uppercase">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#1D4ED8] rounded-full inline-block" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full inline-block" />
                <span>Has Tasks</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL FOR ADDING TASKS */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form 
            onSubmit={handleAddTask} 
            className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md flex flex-col gap-4 border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800">Add New Task</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Task Description</label>
              <input
                type="text"
                autoFocus
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1D4ED8] text-slate-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                <select 
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Personal">Personal</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
                <select 
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-slate-500 font-bold rounded-xl hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-[#1D4ED8] text-white text-xs font-bold rounded-xl hover:bg-blue-800 shadow-xs"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
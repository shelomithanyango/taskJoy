import React, { useState, useEffect } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

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

  // Voice Recognition States
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  // Initialize Speech Recognition API on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false; // Stop automatically when user finishes speaking
      rec.interimResults = false; // Only finalize full sentences
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Append or set the transcribed text directly to the task description field
        setTitleInput(transcript);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert("Voice recognition is not supported in this browser. Try Google Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

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
      status: 'To Do',
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
      <Header />

      {/* Spreads cleanly across the page layout */}
      <main className="flex-1 px-6 py-8 pb-36 w-full max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* INPUT PANEL WITH VOICE ACCELERATOR */}
        <form onSubmit={handleAddTask} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder={isListening ? "Listening actively..." : "New task description or use voice command..."}
              className={`w-full pl-4 pr-12 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:border-blue-500 text-sm transition-colors ${
                isListening ? 'border-red-400 bg-red-50/20 text-red-900 placeholder-red-400' : 'border-slate-200'
              }`}
            />
            {/* VOICE MIC ACTION TOGGLE */}
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-2.5 p-2 rounded-lg transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-100' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100'
              }`}
              title="Toggle Voice Input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 0 3-3v-6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500">
              <option value="" disabled hidden>Category</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
            </select>
            <select value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500">
              <option value="" disabled hidden>Priority</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
            <input type="text" value={dateInput} onChange={(e) => setDateInput(e.target.value)} placeholder="Oct 24, 2023" className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-center font-medium text-slate-700 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
            Add Task
          </button>
        </form>

        {/* FILTER CHIPS */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeFilter === filter ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
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
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-400 text-xs">
              No tasks matched this criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start justify-between gap-4 transition-all">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(task.id, task.status)}
                      className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        task.status === 'Done' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {task.status === 'Done' && '✓'}
                    </button>
                    <div className="flex flex-col gap-1.5">
                      <span className={`font-bold text-slate-900 break-words ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>{task.title}</span>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-[10px] bg-blue-50 hijacking-none text-blue-600 font-bold px-2 py-0.5 rounded">{task.category}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">{task.priority}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">📅 {task.date}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider shrink-0">{task.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER NAV */}
      <Footer />
     
    </div>
  );
}
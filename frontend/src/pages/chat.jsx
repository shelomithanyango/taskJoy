import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function Chat() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  // Use a Ref to safely keep track of the recognition instance
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition API once
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false; // Stop listening automatically after sentence end
      rec.interimResults = true; // Show interim text while user speaks
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setTitleInput(transcript);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert("Microphone access was denied. Please allow microphone permissions in your browser settings.");
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Toggle Voice Recording
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTitleInput(''); // Clear previous text before listening
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!titleInput.trim()) return;

    // Stop listening if sending manually
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const newTask = {
      id: Date.now(),
      title: titleInput,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: "To Do"
    };

    setTasks((prev) => [...prev, newTask]);
    setTitleInput('');
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FB] flex flex-col font-sans text-slate-800 relative">
      {/* HEADER */}
      <Header />

      {/* MAIN CHAT STREAM */}
      <main className="flex-1 px-4 md:px-8 py-6 w-full max-w-3xl mx-auto flex flex-col gap-6 pb-44">
        
        {/* Status Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium px-4 py-1.5 rounded-full shadow-xs">
            <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">🤖</span>
            AI Assistant is active
          </div>
        </div>

        {/* Empty State when no messages exist */}
        {tasks.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-xs">
            No messages yet. Ask the assistant or speak to create a task!
          </div>
        )}

        {/* Dynamic Task Stream */}
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            {/* User Message Bubble */}
            <div className="flex justify-end mt-2">
              <div className="bg-[#1D243A] text-white text-sm p-4 rounded-2xl rounded-tr-none max-w-[85%] leading-relaxed shadow-sm">
                {task.title}
              </div>
            </div>

            {/* AI Confirmation Response */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#4F7BE8] text-white flex items-center justify-center text-xs shrink-0 shadow-sm">
                🤖
              </div>
              <div className="bg-[#5382EC] text-white text-sm p-4 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed shadow-sm">
                Sure thing! I've set that up for you. Here are the details:
              </div>
            </div>

            {/* Dynamic Task Card */}
            <div className="ml-10 bg-[#D9E4FE] rounded-2xl p-5 border border-blue-100/80 shadow-xs flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200/40 rounded-full pointer-events-none" />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2857C5] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2857C5]">
                    Task Added
                  </span>
                  <h4 className="text-base font-bold text-slate-800 leading-tight">
                    {task.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium ml-1">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{task.date}</span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button className="flex-1 py-2 bg-white/70 hover:bg-white text-slate-700 font-semibold text-xs rounded-full border border-blue-200/60 transition-all text-center">
                  Edit
                </button>
                <button className="flex-1 py-2 bg-[#2149B0] hover:bg-[#193A90] text-white font-semibold text-xs rounded-full shadow-sm transition-all text-center border-2 border-dashed border-blue-300">
                  View
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </main>

      {/* FIXED FLOATING INPUT CONTAINER */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-50 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <form 
            onSubmit={handleSendMessage} 
            className="bg-[#E4ECFF] p-2 rounded-full border border-blue-200/80 shadow-lg flex items-center gap-2 backdrop-blur-md"
          >
            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-full transition-all shrink-0 ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-500 hover:text-slate-700'
              }`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Input Field */}
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask Assistant..."}
              className="flex-1 bg-transparent border-none text-slate-800 placeholder-slate-400 text-sm focus:outline-none px-2 min-w-0"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="w-10 h-10 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm"
            >
              <svg className="w-5 h-5 transform rotate-45 -ml-0.5 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Today from "../pages/today";
import Tasks from "../pages/tasks";
import Chat from "../pages/chat";
import Profile from "../pages/profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
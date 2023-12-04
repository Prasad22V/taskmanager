// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Task from "./Pages/Task";

import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout";
import Admin from "./Pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/task" element={<Task />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/EducationCalendar";
import MessagePage from "./pages/MessagePage";
import ReportsPage from "./pages/ReportsPage";
import { useAuth } from "./context/AuthContext";
// import Layout from "./layout/Layout";

const App = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={auth ? <><Dashboard /></> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={auth ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/calendar"
        element={auth ? <Calendar /> : <Navigate to="/login" />}
      />
      <Route
        path="/messages"
        element={auth ? <MessagePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/reports"
        element={auth ? <ReportsPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
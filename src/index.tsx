import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Launch from "./pages/launch/Launch";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Upload from "./pages/upload/Upload";
import Notifications from "./pages/notifications/Notifications";
import Manage from "./pages/manage/Manage";
import Settings from "./pages/settings/Settings";
import Analytics from "./pages/analytics/Analytics";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Launch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

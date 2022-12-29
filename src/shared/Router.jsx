import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ChatPage from "../pages/ChatPage";
import MainPage from "../pages/MainPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/chat/room/:id" element={<ChatPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

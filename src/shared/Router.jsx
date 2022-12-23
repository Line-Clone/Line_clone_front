import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/feature/login/Login";
import MainPage from "../pages/MainPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

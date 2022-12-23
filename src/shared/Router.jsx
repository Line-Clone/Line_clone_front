import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/feature/login/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

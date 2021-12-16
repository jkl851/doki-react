import React from "react";
import Doki from "./Doki";
import Login from "../src/LoginPage/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/doki" element={<Doki />} />
      </Routes>
    </Router>
  );
}

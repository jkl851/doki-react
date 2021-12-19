import React from "react";
import Login from "../src/LoginPage/Login";
import Transfer from "../src/LoginPage/Transfer";
// import Change from "../src/LoginPage/changePassword";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/doki" element={<Transfer />} />
        {/* <Route exact path="/change" element={<Change />} /> */}
      </Routes>
    </Router>
  );
}

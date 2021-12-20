import React, { useEffect, useState } from "react";
import Login from "../src/LoginPage/Login";
import Transfer from "../src/LoginPage/Transfer";
// import Change from "../src/LoginPage/changePassword";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;
export default function App() {
  const [allinfo, setAllinfo] = useState();


  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login setAllinfo={setAllinfo} />}
        />
        <Route exact path="/doki" element={<Transfer allinfo={allinfo} />} />
        {/* <Route exact path="/change" element={<Change />} /> */}
      </Routes>
    </Router>
  );
}

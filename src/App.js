import React, { useEffect, useState } from "react";
import Login from "../src/LoginPage/Login";
import Transfer from "../src/LoginPage/Transfer";
// import Change from "../src/LoginPage/changePassword";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";


axios.defaults.withCredentials = true;
export default function App() {

  const [allinfo, setAllinfo] = useState(JSON.parse(sessionStorage.getItem('User')));
  const [bypass, setBypass] = useState(false);
  const [savedID, setSavedID] = useState("");
  const [check, setCheck] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<Login setAllinfo={setAllinfo} setBypass={setBypass}/>}/>
        <Route exact path="/doki" element={<Transfer allinfo={allinfo} bypass={bypass} savedID={savedID} setSavedID={setSavedID} check={check} setCheck={setCheck} setAllinfo={setAllinfo} />}/>
      </Routes>
    </Router>
  );
  }

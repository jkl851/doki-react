import React, { useEffect, useState } from "react";
import Login from "../src/LoginPage/Login";
import Transfer from "../src/LoginPage/Transfer";
// import Change from "../src/LoginPage/changePassword";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function App() {

//
//  세션 유지로 로그인을 했는데, 새 페이지에서는 세션 유지 안됨. useState값은 넘어가지 않는다. checked 된 값은 해당 탭에서만 존재.
//

  const [checked, setChecked] = useState(false);
  

  if(checked === true){

    const [allinfo, setAllinfo] = useState(JSON.parse(localStorage.getItem('User')));
    // 세션 유지
    return (
      <Router>
        <Routes>
          <Route exact path="/*" element={<Login setAllinfo={setAllinfo} setChecked={setChecked} checked={checked}/>}/>
          <Route exact path="/doki" element={<Transfer allinfo={allinfo}/>}/>
        </Routes>
      </Router>
    );

  }

  else if(checked === false){

    const [allinfo, setAllinfo] = useState(JSON.parse(localStorage.getItem('User')));
    
    sessionStorage.setItem('User', allinfo);
    localStorage.removeItem('User');

    return (
      <Router>
        <Routes>
          <Route exact path="/*" element={<Login setAllinfo={setAllinfo} setChecked={setChecked} checked={checked}/>}/>
          <Route exact path="/doki" element={<Transfer allinfo={allinfo}/>}/>
        </Routes>
      </Router>
    );
  }
  
}

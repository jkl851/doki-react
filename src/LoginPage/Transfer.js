import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Doki from "../Doki";

import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const [session, setSession] = useState(false);
  const navigate = useNavigate();

  useEffect(async (e) => {
    await axios
      .post("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
        if (Response.data === "no session") {
          alert("로그인 하십시오.");
          setSession(false);
          navigate("/login");
        }
        if (Response.data === "has session") {
          setSession(true);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  if (session == true) {
    return (
      <Fragment>
        <Doki />
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};

export default Transfer;
